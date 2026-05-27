import {
  CONFIG_KEY_AND_DEFAULT_VALUE,
  CORE_COMMON_ERROR,
  CORE_COMMON_ERROR_CUSTOM,
  CORE_COMMON_MESSAGE,
  HTTP_CODE,
  IS_OTP_VERIFY,
  STATUS,
  VALID_PASS,
} from '@configs/contanst';
import { GlobalConfigService } from '@core/globalconfig/globalConfig.service';
import { OtpService } from '@core/otp/otp.service';
import { CreateSessionDto } from '@core/session/dto/session.dto';
import { SessionService } from '@core/session/session.service';
import { UsersService } from '@core/users/users.service';
import { NguoiDungThietBi } from '@database/entities/auth/nguoi-dung-thiet-bi.entity';
import { NguoiDungVaiTro } from '@database/entities/auth/nguoi-dung-vai-tro.entity';
import { NguoiDung } from '@database/entities/auth/nguoi-dung.entity';
import { HelperService } from '@helper/helper.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Cache } from 'cache-manager';
import * as moment from 'moment';
import { LogThaoTacService } from 'src/log-thao-tac/log-thao-tac.service';
import { DataSource, Not, Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
import { HttpCoreException } from '../exceptions/core.exception';
import { UserService } from '../profile/profile.service';
import { UserReqData } from '../users/interfaces/user-req.interface';
import {
  ForgotPassDto,
  LogOutDto,
  LoginUserDto,
  ResetPasswordDto,
  SetFirebaseTokenDto,
  UpdatePersonalRoleDto,
} from './dto/auth.dto';
import { AuthHelpers } from './helpers/auth.helpers';
import {
  AuthConfig,
  LoginAttemptData,
  LoginResult,
} from './interfaces/auth.interfaces';

/**
 * Service xử lý các chức năng liên quan đến authentication và authorization
 *
 * @class AuthService
 * @description Service này cung cấp các chức năng:
 * - Đăng nhập/đăng xuất
 * - Quên mật khẩu/đặt lại mật khẩu
 * - Xác thực 2 yếu tố (2FA)
 * - Quản lý session và thiết bị
 * - Kiểm tra quyền truy cập
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly helperService: HelperService,
    private readonly configService: ConfigService,
    private readonly sessionService: SessionService,
    private readonly logThaoTacService: LogThaoTacService,
    private readonly globalConfigService: GlobalConfigService,
    private readonly otpService: OtpService,
    @InjectRepository(NguoiDung)
    private readonly nguoiDungRepo: Repository<NguoiDung>,
    @InjectRepository(NguoiDungVaiTro)
    private readonly nguoiDungVaiTroRepo: Repository<NguoiDungVaiTro>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(NguoiDungThietBi)
    private readonly nguoiDungThietBiRepo: Repository<NguoiDungThietBi>,
  ) {}

  /**
   * Xác thực tài khoản bằng username và password
   *
   * @param taikhoan - Tên đăng nhập, email hoặc số điện thoại
   * @param matkhau - Mật khẩu
   * @returns true nếu xác thực thành công
   * @throws {Error} Nếu username hoặc password không hợp lệ
   *
   * @example
   * ```typescript
   * await authService.authenticationWithUsernameAndPassword('user01', 'password123');
   * ```
   */
  async authenticationWithUsernameAndPassword(
    taikhoan: string,
    matkhau: string,
  ): Promise<boolean> {
    try {
      const findUser: NguoiDung =
        await this.userService.findOneByUsernameOrEmailOrSDT(taikhoan);

      // Kiểm tra mật khẩu đã hash
      const check = await this.helperService.compareHashed(
        matkhau,
        findUser.mat_khau,
      );

      if (!check) {
        throw new Error(CORE_COMMON_ERROR.INVALID_USERNAME_OR_PASSWORD);
      }

      return true;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Đăng nhập vào hệ thống
   *
   * @param payload - Thông tin đăng nhập (username/email/sdt và password)
   * @param device_id - ID thiết bị đang đăng nhập
   * @param reCapchaValue - Token reCAPTCHA (optional)
   * @returns Thông tin người dùng và token hoặc yêu cầu OTP
   * @throws {HttpCoreException} Nếu đăng nhập thất bại hoặc tài khoản bị khóa
   *
   * @example
   * ```typescript
   * const result = await authService.login(
   *   { tai_khoan: 'user01', mat_khau: 'password123' },
   *   'device-uuid-123'
   * );
   * ```
   */
  async login(
    payload: LoginUserDto,
    device_id: string,
    reCapchaValue?: string,
  ): Promise<LoginResult> {
    const MAX_ATTEMPTS_BEFORE_RECAPTCHA = this.configService.get<number>(
      'env.max_attempts_before_recaptcha',
    );

    // Lấy cấu hình hệ thống
    const authConfig = await this.getAuthConfig();

    // Lấy dữ liệu đăng nhập từ cache
    const loginData = await AuthHelpers.getLoginDataFromCache(
      this.cacheManager,
      payload.tai_khoan,
    );

    // Kiểm tra tài khoản có bị khóa không
    await this.validateAccountLockStatus(loginData, authConfig);

    // Kiểm tra reCAPTCHA nếu cần
    await this.verifyRecaptchaIfRequired(
      loginData,
      MAX_ATTEMPTS_BEFORE_RECAPTCHA,
      authConfig.RECAPTCHA_REQUIRED,
      reCapchaValue,
    );

    try {
      // Xác thực username và password
      await this.authenticationWithUsernameAndPassword(
        payload.tai_khoan,
        payload.mat_khau,
      );

      // Đăng nhập thành công - reset số lần thất bại
      await AuthHelpers.resetLoginAttempts(
        this.cacheManager,
        payload.tai_khoan,
      );

      // Xử lý đăng nhập thành công
      return await this.handleLoginSuccess(payload, device_id, authConfig);
    } catch (error) {
      if (error instanceof HttpCoreException) {
        throw error;
      }

      // Xử lý đăng nhập thất bại
      return await this.handleLoginFailure(
        payload.tai_khoan,
        loginData,
        authConfig,
        MAX_ATTEMPTS_BEFORE_RECAPTCHA,
      );
    }
  }

  /**
   * Lấy cấu hình authentication từ GlobalConfig
   *
   * @returns Cấu hình authentication
   * @private
   */
  private async getAuthConfig(): Promise<AuthConfig> {
    const config = await this.globalConfigService.getConfigsByKeysCache([
      CONFIG_KEY_AND_DEFAULT_VALUE.MAX_FAILED_ATTEMPTS,
      CONFIG_KEY_AND_DEFAULT_VALUE.LOCK_TIME,
      CONFIG_KEY_AND_DEFAULT_VALUE.TWO_FACTOR_AUTH,
      CONFIG_KEY_AND_DEFAULT_VALUE.PASS_VALID_TIME,
      CONFIG_KEY_AND_DEFAULT_VALUE.OTP_REAUTH_TTL,
      CONFIG_KEY_AND_DEFAULT_VALUE.CHECK_VALID_PASS,
      CONFIG_KEY_AND_DEFAULT_VALUE.RECAPTCHA_REQUIRED,
    ]);

    return {
      MAX_FAILED_ATTEMPTS: Number(config.MAX_FAILED_ATTEMPTS),
      LOCK_TIME: Number(config.LOCK_TIME),
      TWO_FACTOR_AUTH: Number(config.TWO_FACTOR_AUTH),
      PASS_VALID_TIME: Number(config.PASS_VALID_TIME),
      OTP_REAUTH_TTL: Number(config.OTP_REAUTH_TTL),
      CHECK_VALID_PASS: Number(config.CHECK_VALID_PASS),
      RECAPTCHA_REQUIRED: Number(config.RECAPTCHA_REQUIRED),
    };
  }

  /**
   * Kiểm tra trạng thái khóa tài khoản
   *
   * @param loginData - Dữ liệu đăng nhập từ cache
   * @param authConfig - Cấu hình authentication
   * @throws {HttpCoreException} Nếu tài khoản đang bị khóa
   * @private
   */
  private async validateAccountLockStatus(
    loginData: LoginAttemptData,
    authConfig: AuthConfig,
  ): Promise<void> {
    if (loginData.failedAttempts >= authConfig.MAX_FAILED_ATTEMPTS) {
      const now = moment();
      const lockUntil = moment(loginData.lastFailedTime).add(
        authConfig.LOCK_TIME,
        'milliseconds',
      );

      if (now.isBefore(lockUntil)) {
        const lockMessage = AuthHelpers.generateLockMessage(lockUntil, now);
        throw new HttpCoreException(lockMessage, '423');
      }

      // Reset trạng thái khóa nếu đã hết hạn
      loginData.failedAttempts = 0;
      loginData.lastFailedTime = 0;
      await AuthHelpers.updateFailedLoginAttempts(
        this.cacheManager,
        '', // Will be set by caller
        loginData,
        authConfig.LOCK_TIME,
      );
    }
  }

  /**
   * Xác thực reCAPTCHA nếu cần thiết
   *
   * @param loginData - Dữ liệu đăng nhập từ cache
   * @param maxAttemptsBeforeRecaptcha - Số lần thất bại trước khi yêu cầu reCAPTCHA
   * @param recaptchaRequired - Cấu hình bật/tắt reCAPTCHA
   * @param reCapchaValue - Token reCAPTCHA
   * @throws {HttpCoreException} Nếu cần reCAPTCHA nhưng không có hoặc không hợp lệ
   * @private
   */
  private async verifyRecaptchaIfRequired(
    loginData: LoginAttemptData,
    maxAttemptsBeforeRecaptcha: number,
    recaptchaRequired: number,
    reCapchaValue?: string,
  ): Promise<void> {
    const isRecaptchaConfigured = !!process.env.CORE_RECAPCHA_SECRET_KEY;
    if (
      loginData.failedAttempts >= maxAttemptsBeforeRecaptcha &&
      (recaptchaRequired === STATUS.ACTIVE || isRecaptchaConfigured)
    ) {
      if (!reCapchaValue) {
        throw new HttpCoreException(
          CORE_COMMON_ERROR.RECAPTCHA_REQUIRED,
          HTTP_CODE.UNAUTHORIZED,
        );
      }

      const captchaValid = await this.verifyCaptcha(reCapchaValue);
      if (!captchaValid) {
        throw new HttpCoreException(
          'Xác thực reCAPTCHA thất bại. Vui lòng kiểm tra lại',
          HTTP_CODE.UNAUTHORIZED,
        );
      }
    }
  }

  /**
   * Xử lý khi đăng nhập thành công
   *
   * @param payload - Thông tin đăng nhập
   * @param device_id - ID thiết bị
   * @param authConfig - Cấu hình authentication
   * @returns Thông tin người dùng và token hoặc yêu cầu OTP
   * @private
   */
  private async handleLoginSuccess(
    payload: LoginUserDto,
    device_id: string,
    authConfig: AuthConfig,
  ): Promise<LoginResult> {
    const findUser = await this.userService.findOneByUsernameOrEmailOrSDT(
      payload.tai_khoan,
    );

    if (payload.app_type === 'admin' && findUser.ma_vai_tro === 'CUSTOMER') {
      throw new HttpCoreException(
        'Tài khoản không có quyền truy cập trang quản trị',
        HTTP_CODE.FORBIDDEN,
      );
    }

    // Kiểm tra thiết bị đã được xác thực chưa
    const isDeviceVerified = await AuthHelpers.checkDeviceInCache(
      this.cacheManager,
      findUser.id,
      device_id,
    );

    // Xử lý 2FA cho thiết bị mới
    if (!isDeviceVerified && authConfig.TWO_FACTOR_AUTH === STATUS.ACTIVE) {
      await this.otpService.handleOtp(findUser);
      await AuthHelpers.saveDeviceToCache(
        this.cacheManager,
        findUser.id,
        device_id,
        true,
        authConfig.OTP_REAUTH_TTL,
      );
      return {
        email: findUser.email,
        requireOtp: true,
      };
    }

    // Kiểm tra OTP có hết hạn không
    await this.checkOtpExpired(findUser);

    // Kiểm tra mật khẩu có cần cập nhật không
    const need_update_password = this.checkPasswordExpiry(findUser, authConfig);

    // Xử lý 2FA cho người dùng chưa xác thực OTP
    if (
      authConfig.TWO_FACTOR_AUTH === STATUS.ACTIVE &&
      findUser.is_otp_verify === IS_OTP_VERIFY.NOT_VERIFY
    ) {
      await this.otpService.handleOtp(findUser);
      return {
        requireOtp: true,
        email: findUser.email,
      };
    }

    // Tạo token và session
    const token = await this.createAccessToken(findUser);
    await this.createUserSession(
      findUser,
      token,
      payload.firebase_token,
      device_id,
    );

    // Ghi log đăng nhập
    await this.logThaoTacService.logLogin(findUser);

    // Làm sạch dữ liệu nhạy cảm
    const sanitizedUser = AuthHelpers.sanitizeUserData(findUser);

    return { ...sanitizedUser, token, need_update_password };
  }

  /**
   * Xử lý khi đăng nhập thất bại
   *
   * @param username - Tên đăng nhập
   * @param loginData - Dữ liệu đăng nhập từ cache
   * @param authConfig - Cấu hình authentication
   * @param maxAttemptsBeforeRecaptcha - Số lần thất bại trước khi yêu cầu reCAPTCHA
   * @throws {HttpCoreException} Với thông báo lỗi phù hợp
   * @private
   */
  private async handleLoginFailure(
    username: string,
    loginData: LoginAttemptData,
    authConfig: AuthConfig,
    maxAttemptsBeforeRecaptcha: number,
  ): Promise<never> {
    const now = moment();
    loginData.failedAttempts += 1;
    loginData.lastFailedTime = now.valueOf();

    await AuthHelpers.updateFailedLoginAttempts(
      this.cacheManager,
      username,
      loginData,
      authConfig.LOCK_TIME,
    );

    const remainingAttempts =
      authConfig.MAX_FAILED_ATTEMPTS - loginData.failedAttempts;

    // Kiểm tra reCAPTCHA trước khi kiểm tra khóa tài khoản
    const isRecaptchaConfigured = !!process.env.CORE_RECAPCHA_SECRET_KEY;
    if (
      loginData.failedAttempts >= maxAttemptsBeforeRecaptcha &&
      (authConfig.RECAPTCHA_REQUIRED === STATUS.ACTIVE || isRecaptchaConfigured)
    ) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.RECAPTCHA_REQUIRED,
        HTTP_CODE.UNAUTHORIZED,
      );
    }

    if (remainingAttempts > 0) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR_CUSTOM.INVALID_LOGIN_ATTEMPTS(remainingAttempts),
        '401',
      );
    } else {
      throw new HttpCoreException(
        CORE_COMMON_ERROR_CUSTOM.ACCOUNT_LOCKED(
          moment.duration(authConfig.LOCK_TIME).asMinutes(),
        ),
        '423',
      );
    }
  }

  /**
   * Tạo access token cho người dùng
   *
   * @param user - Thông tin người dùng
   * @returns JWT access token
   * @throws {HttpCoreException} Nếu chưa cấu hình thời gian hết hạn token
   * @private
   */
  private async createAccessToken(user: NguoiDung): Promise<string> {
    const expiresTime = this.configService.get<string>('env.jwt_expires_time');

    if (!expiresTime) {
      throw new HttpCoreException(
        'Chưa cấu hình thời gian hết hạn của token',
        HTTP_CODE.INTERNAL_ERROR,
      );
    }

    return await AuthHelpers.generateAccessToken(this.helperService, user, {
      expiresIn: expiresTime,
    });
  }

  /**
   * Tạo session mới cho người dùng
   *
   * @param user - Thông tin người dùng
   * @param token - Access token
   * @param firebaseToken - Firebase token (optional)
   * @param deviceId - ID thiết bị
   * @private
   */
  private async createUserSession(
    user: NguoiDung,
    token: string,
    firebaseToken: string | undefined,
    deviceId: string,
  ): Promise<void> {
    const createSessionDto = new CreateSessionDto();
    createSessionDto.nguoi_dung_id = user.id;
    createSessionDto.access_token = token;
    createSessionDto.firebase_token = firebaseToken || '';
    createSessionDto.device_id = deviceId;
    createSessionDto.nguoi_tao = user.id;
    createSessionDto.nguoi_cap_nhat = user.id;

    await this.sessionService.insertSession(createSessionDto);
  }

  /**
   * Kiểm tra mật khẩu có hết hạn không
   *
   * @param user - Thông tin người dùng
   * @param authConfig - Cấu hình authentication
   * @returns true nếu cần cập nhật mật khẩu
   * @private
   */
  private checkPasswordExpiry(
    user: NguoiDung,
    authConfig: AuthConfig,
  ): boolean {
    if (authConfig.CHECK_VALID_PASS !== VALID_PASS.VALID) {
      return false;
    }

    const lastPasswordChange = user.last_password_change;
    if (!lastPasswordChange) {
      return false;
    }

    const daysSinceLastChange = moment().diff(
      moment(lastPasswordChange),
      'days',
    );

    return daysSinceLastChange >= authConfig.PASS_VALID_TIME;
  }

  /**
   * Xác thực token JWT
   *
   * @param token - JWT token cần xác thực
   * @returns Thông tin người dùng từ token
   * @throws {HttpCoreException} Nếu token không hợp lệ hoặc không tồn tại trong DB
   *
   * @example
   * ```typescript
   * const user = await authService.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
   * ```
   */
  async verifyToken(token: string): Promise<NguoiDung> {
    try {
      const verifyToken: NguoiDung = this.jwtService.verify(token);

      const checkTokenDB = await this.sessionService.checkTokenInDB(
        verifyToken.id,
        token,
      );

      if (!checkTokenDB) {
        throw new Error();
      }

      return verifyToken;
    } catch (error) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.INVALID_TOKEN,
        HTTP_CODE.FORBIDDEN,
      );
    }
  }

  /**
   * Xác thực token cho working hours (không throw error nếu không có token)
   *
   * @param token - JWT token cần xác thực
   * @returns Thông tin người dùng hoặc null nếu token không hợp lệ
   *
   * @example
   * ```typescript
   * const user = await authService.verifyTokenWorkingHours(token);
   * if (user) {
   *   // Token hợp lệ
   * }
   * ```
   */
  async verifyTokenWorkingHours(token: string): Promise<NguoiDung | null> {
    if (!token) {
      return null;
    }

    try {
      const verifyToken: NguoiDung = this.jwtService.verify(token);

      const checkTokenDB = await this.sessionService.checkTokenInDB(
        verifyToken.id,
        token,
      );

      if (!checkTokenDB) {
        return null;
      }

      return verifyToken;
    } catch (error) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.INVALID_TOKEN,
        HTTP_CODE.FORBIDDEN,
      );
    }
  }

  /**
   * Xác thực reCAPTCHA token với Google
   *
   * @param token - reCAPTCHA token
   * @returns true nếu xác thực thành công
   * @throws {HttpCoreException} Nếu chưa cấu hình URL hoặc secret key
   *
   * @example
   * ```typescript
   * const isValid = await authService.verifyCaptcha('recaptcha-token-here');
   * ```
   */
  verifyCaptcha = async (token: string): Promise<boolean> => {
    const url = this.configService.get<string>('env.url_recapcha');
    const secretKey = this.configService.get<string>(
      'env.re_capcha_secret_key',
    );

    if (!url) {
      throw new HttpCoreException(
        'Chưa cấu hình url recaptcha',
        HTTP_CODE.INTERNAL_ERROR,
      );
    }

    if (!secretKey) {
      throw new HttpCoreException(
        'Chưa cấu hình secret key recaptcha',
        HTTP_CODE.INTERNAL_ERROR,
      );
    }

    // Debugging secret key and token
    const maskedSecret = secretKey
      ? `${secretKey.substring(0, 3)}...${secretKey.substring(
          secretKey.length - 3,
        )}`
      : 'null';
    this.logger.debug(
      `@verifyCaptcha >> Initiating verify with secret: ${maskedSecret}, token length: ${token?.length}`,
    );

    // Google siteverify prefers application/x-www-form-urlencoded
    const params = new URLSearchParams();
    params.append('secret', secretKey);
    params.append('response', token);

    try {
      const response = await axios.post(url, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.data.success) {
        const errorCodes = response.data['error-codes'];
        this.logger.debug(
          `@verifyCaptcha >> Verification Failed: ${JSON.stringify(
            errorCodes,
          )}`,
        );
        this.logger.debug(
          `@verifyCaptcha >> Google Response Detail: ${JSON.stringify(
            response.data,
          )}`,
        );
      } else {
        this.logger.debug(`@verifyCaptcha >> Verification Success!`);
      }

      return response.data.success;
    } catch (error) {
      this.logger.error(`@verifyCaptcha >> Request Error: ${error.message}`);
      return false;
    }
  };

  /**
   * Đăng xuất khỏi hệ thống
   *
   * @param data - Thông tin đăng xuất (user ID và device ID)
   * @returns Thông báo đăng xuất thành công
   *
   * @example
   * ```typescript
   * await authService.logout({ nguoi_dung_id: 1, device_id: 'device-123' });
   * ```
   */
  async logout(data: LogOutDto): Promise<string> {
    await this.sessionService.removeSession(data.nguoi_dung_id, data.device_id);
    await this.logThaoTacService.logLogout(data.nguoi_dung_id);
    return CORE_COMMON_MESSAGE.LOGOUT_SUCCESS;
  }

  /**
   * Xử lý quên mật khẩu - gửi email reset password
   *
   * @param data - Thông tin tài khoản và email
   * @returns Thông báo gửi email thành công
   * @throws {HttpCoreException} Nếu email không khớp với tài khoản
   *
   * @example
   * ```typescript
   * await authService.forgotPassword({
   *   tai_khoan: 'user01',
   *   email: 'user@example.com'
   * });
   * ```
   */
  async forgotPassword(data: ForgotPassDto): Promise<string> {
    const nguoiDung = await this.userService.findOneByUsernameOrEmailOrSDT(
      data.tai_khoan,
    );

    if (nguoiDung.email !== data.email) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.INVALID_EMAIL,
        HTTP_CODE.UNAUTHORIZED,
      );
    }

    // Tạo token reset password hợp lệ trong 3 phút
    const token = await AuthHelpers.generateResetPasswordToken(
      this.jwtService,
      nguoiDung,
    );

    // Lưu token vào DB
    await this.userService.updateResetPassToken(nguoiDung.tai_khoan, token);

    // Gửi email link đổi mật khẩu
    await this.emailService.sendResetPassEmail(nguoiDung, token);

    // Ghi log
    await this.logThaoTacService.logForgotPassword(data);

    return CORE_COMMON_MESSAGE.FORGOT_PASSWORD_SUCCESS;
  }

  /**
   * Đặt lại mật khẩu mới
   *
   * @param body - Thông tin reset password (token và mật khẩu mới)
   * @returns Thông báo reset password thành công
   * @throws {HttpCoreException} Nếu token không hợp lệ hoặc đã hết hạn
   *
   * @example
   * ```typescript
   * await authService.resetPassword({
   *   token_reset_pass: 'reset-token',
   *   mat_khau_moi: 'NewPassword123!'
   * });
   * ```
   */
  async resetPassword(body: ResetPasswordDto): Promise<string> {
    // Kiểm tra token reset password hợp lệ (JWT)
    let resetPassData = null;
    try {
      resetPassData = await AuthHelpers.verifyResetPasswordToken(
        this.jwtService,
        body.token_reset_pass,
      );
    } catch (error) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.RESET_PASSWORD_SESSION_EXPIRES,
        HTTP_CODE.FORBIDDEN,
      );
    }

    // Kiểm tra token reset password hợp lệ (DB)
    const user = await this.userService.findOneByUsernameOrEmailOrSDT(
      resetPassData.tai_khoan,
    );

    if (user.reset_pass_token !== body.token_reset_pass) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.RESET_PASSWORD_SESSION_EXPIRES,
        HTTP_CODE.FORBIDDEN,
      );
    }

    // Xóa token reset password
    await this.userService.updateResetPassToken(resetPassData.tai_khoan, '');

    // Cập nhật mật khẩu mới
    const newPass = await this.helperService.genHashedPassword(
      body.mat_khau_moi,
    );
    await this.userService.updateNewPassword(resetPassData.email, newPass);

    return CORE_COMMON_MESSAGE.RESET_PASSWORD_SUCCESS;
  }

  /**
   * Kiểm tra quyền truy cập API của người dùng
   *
   * @param userReq - Thông tin người dùng từ request
   * @param baseUrl - Đường dẫn root của API
   * @param action - Loại hành động (create, read, update, delete)
   * @returns true nếu có quyền, false nếu không có quyền
   *
   * @example
   * ```typescript
   * const hasPermission = authService.checkUserPermission(
   *   userReq,
   *   '/api/users',
   *   'create'
   * );
   * ```
   */
  checkUserPermission(
    userReq: UserReqData,
    baseUrl: string,
    action: string,
  ): boolean {
    if (!userReq?.phan_quyen) {
      return false;
    }
    const perrmission: any[] = JSON.parse(userReq.phan_quyen);
    const urlPerrmission = perrmission.find((per: any) => per.name === baseUrl);

    if (!urlPerrmission) {
      return false;
    }

    return urlPerrmission['actions'][action];
  }

  /**
   * Kiểm tra OTP có hết hạn hay không
   *
   * @param user - Thông tin người dùng
   * @returns true nếu OTP đã hết hạn
   *
   * @example
   * ```typescript
   * const isExpired = await authService.checkOtpExpired(user);
   * ```
   */
  async checkOtpExpired(user: NguoiDung): Promise<boolean> {
    const renewOtp = await this.globalConfigService.getConfigByKeyCache(
      'OTP_REAUTH_TTL',
    );

    const now = moment();
    const lastOtpTime = moment(user.last_otp_verified);
    const diff = now.diff(lastOtpTime, 'milliseconds');

    if (diff >= Number(renewOtp)) {
      await this.usersService.updateIsOtpVerify(
        user.id,
        IS_OTP_VERIFY.NOT_VERIFY,
      );
      return true;
    }

    return false;
  }

  /**
   * Tạo token để cập nhật mật khẩu (hợp lệ 1 ngày)
   *
   * @param user - Thông tin người dùng
   * @returns Update password token
   *
   * @example
   * ```typescript
   * const token = await authService.generateUpdatePassToken(user);
   * ```
   */
  async generateUpdatePassToken(user: NguoiDung): Promise<string> {
    return await AuthHelpers.generateUpdatePasswordToken(this.jwtService, user);
  }

  /**
   * Cập nhật Firebase token cho người dùng
   *
   * @param data - Thông tin Firebase token
   * @param userReq - Thông tin người dùng từ request
   * @returns Thông báo cập nhật thành công
   * @throws {HttpCoreException} Nếu không tìm thấy người dùng
   *
   * @example
   * ```typescript
   * await authService.setFirebaseToken(
   *   { firebase_token: 'fcm-token' },
   *   userReq
   * );
   * ```
   */
  async setFirebaseToken(
    data: SetFirebaseTokenDto,
    userReq: UserReqData,
  ): Promise<string> {
    const user = await this.userService.findOneById(userReq.id);

    if (!user) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.NOT_FOUND_OR_INACTIVE,
        HTTP_CODE.NOT_FOUND,
      );
    }

    // Cập nhật firebase token trong session
    await this.sessionService.updateFirebaseToken(
      user.id,
      data.firebase_token || null,
    );

    return CORE_COMMON_MESSAGE.SET_FIREBASE_TOKEN_SUCCESS;
  }

  /**
   * Cập nhật vai trò cá nhân của người dùng
   *
   * @param data - Thông tin vai trò mới
   * @param userReq - Thông tin người dùng từ request
   * @returns Thông tin người dùng sau khi cập nhật
   * @throws {HttpCoreException} Nếu không tìm thấy người dùng hoặc vai trò không hợp lệ
   *
   * @example
   * ```typescript
   * const updatedUser = await authService.updatePersonalRole(
   *   { ma_vai_tro: 'ADMIN' },
   *   userReq
   * );
   * ```
   */
  async updatePersonalRole(
    data: UpdatePersonalRoleDto,
    userReq: UserReqData,
  ): Promise<NguoiDung> {
    const user = await this.userService.findOneByUsernameOrEmailOrSDT(
      userReq.tai_khoan,
    );

    if (!user) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.NOT_FOUND_OR_INACTIVE,
        HTTP_CODE.NOT_FOUND,
      );
    }

    // Lấy danh sách vai trò của người dùng
    const personalRole = await this.nguoiDungVaiTroRepo.find({
      where: { nguoi_dung_id: user.id },
      relations: { vai_tro: true },
      select: {
        vai_tro: {
          id: true,
          ten_vai_tro: true,
          ma_vai_tro: true,
          phan_quyen: true,
        },
      },
    });

    // Kiểm tra vai trò có tồn tại không
    const checkVaiTro = personalRole.find(
      (item) => item.vai_tro.ma_vai_tro === data.ma_vai_tro,
    );

    if (!checkVaiTro) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.NOT_FOUND_OR_INACTIVE,
        HTTP_CODE.NOT_FOUND,
      );
    }

    // Xóa các thiết bị khác (trừ thiết bị hiện tại)
    await this.nguoiDungThietBiRepo.delete({
      nguoi_dung_id: userReq.id,
      device_id: Not(userReq.device_id),
    });

    // Cập nhật vai trò
    const res = await this.nguoiDungRepo.update(user.id, {
      ma_vai_tro: data.ma_vai_tro,
    });

    if (res.affected === 0) {
      throw new HttpCoreException(
        'Cập nhật vai trò thất bại',
        HTTP_CODE.NOT_FOUND,
      );
    }

    // Lấy thông tin người dùng sau khi cập nhật
    const userFinal = await this.userService.findOneByUsernameOrEmailOrSDT(
      user.tai_khoan,
    );

    return AuthHelpers.sanitizeUserData(userFinal);
  }
}
