import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserReq } from '../decorators/user.decorator';
import { seconds, Throttle } from '@nestjs/throttler';
import { UserReqData } from '../users/interfaces/user-req.interface';
import { AuthService } from './auth.service';
import {
  LoginUserDto,
  ResetPasswordDto,
  ForgotPassDto,
  VerifyOtpDto,
  SetFirebaseTokenDto,
  UpdatePersonalRoleDto,
} from './dto/auth.dto';
import { UsersService } from '@core/users/users.service';
import { HTTP_CODE } from '@configs/contanst';
import { SessionService } from '@core/session/session.service';
import { UserService } from '@core/profile/profile.service';
import { OtpService } from '@core/otp/otp.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { NguoiDung } from '@database/entities/auth/nguoi-dung.entity';
import { VaiTro } from '@database/entities/auth/vai-tro.entity';
import { NguoiDungVaiTro } from '@database/entities/auth/nguoi-dung-vai-tro.entity';

import { HelperService } from '@helper/helper.service';
import { HttpCoreException } from '@core/exceptions/core.exception';

/**
 * Controller xử lý các endpoint liên quan đến authentication
 *
 * @class AuthController
 * @description Controller này cung cấp các endpoints:
 * - POST /auth/login - Đăng nhập
 * - POST /auth/logout - Đăng xuất
 * - POST /auth/forgot-password - Quên mật khẩu
 * - POST /auth/reset-password - Đặt lại mật khẩu
 * - POST /auth/generate-otp - Tạo mã OTP
 * - POST /auth/verify-otp - Xác thực mã OTP
 * - POST /auth/set-firebase-token - Cập nhật Firebase token
 * - POST /auth/update-personal-role - Cập nhật vai trò cá nhân
 */
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly otpService: OtpService,
    private readonly helperService: HelperService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Đăng nhập vào hệ thống
   *
   * @route POST /auth/login
   * @param loginUserDto - Thông tin đăng nhập (username/email/sdt và password)
   * @param userReq - Thông tin request (device_id, re_capcha_token)
   * @returns Thông tin người dùng và token hoặc yêu cầu OTP
   * @throws {HttpCoreException} Nếu đăng nhập thất bại
   *
   * @example
   * Request body:
   * ```json
   * {
   *   "tai_khoan": "user01",
   *   "mat_khau": "Password123!",
   *   "firebase_token": "fcm-token-optional"
   * }
   * ```
   *
   * Response (success):
   * ```json
   * {
   *   "id": 1,
   *   "tai_khoan": "USER01",
   *   "email": "user@example.com",
   *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
   *   "need_update_password": false
   * }
   * ```
   *
   * Response (require OTP):
   * ```json
   * {
   *   "requireOtp": true,
   *   "email": "user@example.com"
   * }
   * ```
   */
  @HttpCode(200)
  @Post('/register')
  async register(@Body() body: any) {
    const nguoiDungRepo = this.dataSource.getRepository(NguoiDung);

    // 1. Check if username or email or phone already exists
    const existingUser = await nguoiDungRepo.findOne({
      where: [
        { tai_khoan: body.tai_khoan },
        { email: body.email },
        { so_dien_thoai: body.so_dien_thoai },
      ],
    });

    if (existingUser) {
      throw new HttpCoreException(
        'Tài khoản, email hoặc số điện thoại đã tồn tại trong hệ thống',
        HTTP_CODE.BAD_REQUEST,
      );
    }

    // 2. Hash the password
    const hashedPassword = await this.helperService.genHashedPassword(
      body.mat_khau,
    );

    // 3. Create NguoiDung record
    const ho_va_ten = `${body.ho || ''} ${body.ten || ''}`.trim();
    const newUser = nguoiDungRepo.create({
      ho: body.ho || '',
      ten: body.ten || '',
      ho_va_ten: ho_va_ten || 'Khách hàng',
      tai_khoan: body.tai_khoan,
      mat_khau: hashedPassword,
      email: body.email,
      so_dien_thoai: body.so_dien_thoai,
      ngay_sinh: body.ngay_sinh ? new Date(body.ngay_sinh) : new Date(),
      gioi_tinh: body.gioi_tinh !== undefined ? body.gioi_tinh : 1,
      dia_chi: body.dia_chi || '',
      tinh_id: body.tinh_id || 0,
      xa_id: body.xa_id || 0,
      ma_vai_tro: 'USER',
      trang_thai: 1,
      id_doi_tuong: 1,
      nguoi_tao: 0,
      nguoi_cap_nhat: 0,
    });
    const savedUser = await nguoiDungRepo.save(newUser);

    const vaiTroRepo = this.dataSource.getRepository(VaiTro);
    const nguoiDungVaiTroRepo = this.dataSource.getRepository(NguoiDungVaiTro);
    const customerRole = await vaiTroRepo.findOne({ where: { ma_vai_tro: 'USER' } });
    if (customerRole) {
      await nguoiDungVaiTroRepo.save(
        nguoiDungVaiTroRepo.create({
          nguoi_dung_id: savedUser.id,
          vai_tro_id: customerRole.id,
        }),
      );
    }

    return {
      message: 'Đăng ký tài khoản thành công',
      user: {
        id: savedUser.id,
        tai_khoan: savedUser.tai_khoan,
        email: savedUser.email,
      },
    };
  }

  @HttpCode(200)
  @Post('/login')
  @Throttle({ default: { limit: 10, ttl: seconds(60) } })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @UserReq() userReq: UserReqData,
  ) {
    return await this.authService.login(
      loginUserDto,
      userReq.device_id,
      userReq.re_capcha_token,
    );
  }

  /**
   * Đăng xuất khỏi hệ thống
   *
   * @route POST /auth/logout
   * @param userReq - Thông tin người dùng từ request
   * @returns Thông báo đăng xuất thành công
   *
   * @example
   * Response:
   * ```json
   * "Đăng xuất thành công"
   * ```
   */
  @HttpCode(200)
  @Post('/logout')
  async logout(@UserReq() userReq: UserReqData) {
    return await this.authService.logout({
      device_id: userReq.device_id,
      nguoi_dung_id: userReq.id,
    });
  }

  /**
   * Gửi email quên mật khẩu
   *
   * @route POST /auth/forgot-password
   * @param body - Thông tin tài khoản và email
   * @returns Thông báo gửi email thành công
   * @throws {HttpCoreException} Nếu email không khớp với tài khoản
   *
   * @example
   * Request body:
   * ```json
   * {
   *   "tai_khoan": "user01",
   *   "email": "user@example.com"
   * }
   * ```
   *
   * Response:
   * ```json
   * "Vui lòng kiểm tra email để đặt lại mật khẩu"
   * ```
   */
  @HttpCode(200)
  @Post('/forgot-password')
  @Throttle({ default: { limit: 3, ttl: seconds(60) } })
  async forgotPassword(@Body() body: ForgotPassDto) {
    return await this.authService.forgotPassword(body);
  }

  /**
   * Đặt lại mật khẩu mới
   *
   * @route POST /auth/reset-password
   * @param body - Token reset password và mật khẩu mới
   * @returns Thông báo reset password thành công
   * @throws {HttpCoreException} Nếu token không hợp lệ hoặc đã hết hạn
   *
   * @example
   * Request body:
   * ```json
   * {
   *   "token_reset_pass": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
   *   "mat_khau_moi": "NewPassword123!"
   * }
   * ```
   *
   * Response:
   * ```json
   * "Đặt lại mật khẩu thành công"
   * ```
   */
  @HttpCode(200)
  @Post('/reset-password')
  @Throttle({ default: { limit: 1, ttl: seconds(1) } })
  async resetPassword(@Body() body: ResetPasswordDto) {
    return await this.authService.resetPassword(body);
  }

  /**
   * Tạo mã OTP và gửi qua email
   *
   * @route POST /auth/generate-otp
   * @param body - Email người dùng
   * @returns Thông báo tạo OTP thành công
   * @throws {HttpException} Nếu không tìm thấy người dùng
   *
   * @example
   * Request body:
   * ```json
   * {
   *   "email": "user@example.com"
   * }
   * ```
   */
  @HttpCode(200)
  @Post('/generate-otp')
  async generateOtp(@Body() body: { email: string }) {
    const user = await this.userService.findOneByEmail(body.email);

    if (!user) {
      throw new HttpException(HTTP_CODE.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return await this.otpService.handleOtp(user);
  }

  /**
   * Xác thực mã OTP
   *
   * @route POST /auth/verify-otp
   * @param userReq - Thông tin request (device_id)
   * @param body - Email và mã OTP
   * @returns Thông tin người dùng và token nếu xác thực thành công
   * @throws {HttpException} Nếu không tìm thấy người dùng
   * @throws {HttpCoreException} Nếu OTP không hợp lệ
   *
   * @example
   * Request body:
   * ```json
   * {
   *   "email": "user@example.com",
   *   "otp": "123456"
   * }
   * ```
   */
  @HttpCode(200)
  @Post('/verify-otp')
  async verifyOtp(@UserReq() userReq: UserReqData, @Body() body: VerifyOtpDto) {
    const user = await this.userService.findOneByEmail(body.email);

    if (!user) {
      throw new HttpException(HTTP_CODE.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return await this.otpService.verifyOtp(body.otp, user, userReq.device_id);
  }

  /**
   * Cập nhật Firebase token cho push notification
   *
   * @route POST /auth/set-firebase-token
   * @param body - Firebase token
   * @param userReq - Thông tin người dùng từ request
   * @returns Thông báo cập nhật thành công
   *
   * @example
   * Request body:
   * ```json
   * {
   *   "firebase_token": "fcm-token-here"
   * }
   * ```
   *
   * Response:
   * ```json
   * "Cập nhật Firebase token thành công"
   * ```
   */
  @HttpCode(200)
  @Post('/set-firebase-token')
  async setFirebaseToken(
    @Body() body: SetFirebaseTokenDto,
    @UserReq() userReq: UserReqData,
  ) {
    return await this.authService.setFirebaseToken(body, userReq);
  }

  /**
   * Cập nhật vai trò cá nhân của người dùng
   *
   * @route POST /auth/update-personal-role
   * @param body - Mã vai trò mới
   * @param userReq - Thông tin người dùng từ request
   * @returns Thông tin người dùng sau khi cập nhật
   * @throws {HttpCoreException} Nếu vai trò không hợp lệ
   *
   * @example
   * Request body:
   * ```json
   * {
   *   "ma_vai_tro": "ADMIN"
   * }
   * ```
   */
  @HttpCode(200)
  @Post('/update-personal-role')
  async updatePersonalRole(
    @Body() body: UpdatePersonalRoleDto,
    @UserReq() userReq: UserReqData,
  ) {
    return await this.authService.updatePersonalRole(body, userReq);
  }
}
