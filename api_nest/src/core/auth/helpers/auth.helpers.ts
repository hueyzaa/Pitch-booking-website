import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { HelperService } from '@helper/helper.service';
import { NguoiDung } from '@database/entities/auth/nguoi-dung.entity';
import {
  LoginAttemptData,
  UserDevices,
  TokenPayload,
  TokenOptions,
} from '../interfaces/auth.interfaces';
import { AUTH_CACHE_KEYS, TOKEN_EXPIRY } from '../constants/auth.constants';

/**
 * Helper class chứa các utility functions cho auth module
 */
export class AuthHelpers {
  /**
   * Lấy dữ liệu đăng nhập từ cache
   * @param cacheManager - Cache manager instance
   * @param username - Tên đăng nhập
   * @returns Dữ liệu số lần đăng nhập thất bại
   */
  static async getLoginDataFromCache(
    cacheManager: Cache,
    username: string,
  ): Promise<LoginAttemptData> {
    const cacheKey = AUTH_CACHE_KEYS.LOGIN_TEMP(username);

    try {
      const cached = await cacheManager.get<string>(cacheKey);

      if (typeof cached === 'string') {
        return JSON.parse(cached);
      }

      return {
        failedAttempts: 0,
        lastFailedTime: 0,
      };
    } catch (error) {
      return {
        failedAttempts: 0,
        lastFailedTime: 0,
      };
    }
  }

  /**
   * Cập nhật số lần đăng nhập thất bại vào cache
   * @param cacheManager - Cache manager instance
   * @param username - Tên đăng nhập
   * @param loginData - Dữ liệu đăng nhập
   * @param ttl - Thời gian sống của cache (milliseconds)
   */
  static async updateFailedLoginAttempts(
    cacheManager: Cache,
    username: string,
    loginData: LoginAttemptData,
    ttl: number,
  ): Promise<void> {
    const cacheKey = AUTH_CACHE_KEYS.LOGIN_TEMP(username);
    await cacheManager.set(cacheKey, JSON.stringify(loginData), ttl);
  }

  /**
   * Reset số lần đăng nhập thất bại
   * @param cacheManager - Cache manager instance
   * @param username - Tên đăng nhập
   */
  static async resetLoginAttempts(
    cacheManager: Cache,
    username: string,
  ): Promise<void> {
    const cacheKey = AUTH_CACHE_KEYS.LOGIN_TEMP(username);
    await cacheManager.del(cacheKey);
  }

  /**
   * Lưu thông tin thiết bị vào cache
   * @param cacheManager - Cache manager instance
   * @param userId - ID người dùng
   * @param deviceId - ID thiết bị
   * @param isOtpVerified - Thiết bị đã xác thực OTP
   * @param expiresIn - Thời gian hết hạn (milliseconds)
   */
  static async saveDeviceToCache(
    cacheManager: Cache,
    userId: number,
    deviceId: string,
    isOtpVerified: boolean,
    expiresIn: number,
  ): Promise<void> {
    const cacheKey = AUTH_CACHE_KEYS.USER_DEVICES(userId);
    const existingDevices = await cacheManager
      .get<string>(cacheKey)
      .then((data) => JSON.parse(data || '{}') as UserDevices);

    // Cập nhật hoặc thêm mới device_id
    existingDevices[deviceId] = {
      is_otp_verified: isOtpVerified,
      last_active: new Date().toISOString(),
    };

    // Lưu lại vào cache
    await cacheManager.set(
      cacheKey,
      JSON.stringify(existingDevices),
      expiresIn,
    );
  }

  /**
   * Kiểm tra thiết bị có được xác thực trong cache hay không
   * @param cacheManager - Cache manager instance
   * @param userId - ID người dùng
   * @param deviceId - ID thiết bị
   * @returns true nếu thiết bị đã được xác thực
   */
  static async checkDeviceInCache(
    cacheManager: Cache,
    userId: number,
    deviceId: string,
  ): Promise<boolean> {
    const cacheKey = AUTH_CACHE_KEYS.USER_DEVICES(userId);
    const existingDevices = await cacheManager
      .get<string>(cacheKey)
      .then((data) => JSON.parse(data || '{}') as UserDevices);

    // Kiểm tra trạng thái device_id
    if (existingDevices[deviceId]?.is_otp_verified === true) {
      return true;
    }

    return false;
  }

  /**
   * Tạo access token cho người dùng
   * @param helperService - Helper service instance
   * @param user - Thông tin người dùng
   * @param options - Options cho token
   * @returns JWT token
   */
  static async generateAccessToken(
    helperService: HelperService,
    user: NguoiDung,
    options: TokenOptions,
  ): Promise<string> {
    return await helperService.signJWTToken(user, options);
  }

  /**
   * Tạo token để reset mật khẩu
   * @param jwtService - JWT service instance
   * @param user - Thông tin người dùng
   * @returns Reset password token
   */
  static async generateResetPasswordToken(
    jwtService: JwtService,
    user: NguoiDung,
  ): Promise<string> {
    const payload: TokenPayload = {
      email: user.email,
      tai_khoan: user.tai_khoan,
      time: Date.now(),
    };

    return await jwtService.signAsync(payload, {
      expiresIn: TOKEN_EXPIRY.RESET_PASSWORD,
    });
  }

  /**
   * Tạo token để cập nhật mật khẩu
   * @param jwtService - JWT service instance
   * @param user - Thông tin người dùng
   * @returns Update password token
   */
  static async generateUpdatePasswordToken(
    jwtService: JwtService,
    user: NguoiDung,
  ): Promise<string> {
    const payload: TokenPayload = {
      email: user.email,
      tai_khoan: user.tai_khoan,
      time: Date.now(),
    };

    return await jwtService.signAsync(payload, {
      expiresIn: TOKEN_EXPIRY.UPDATE_PASSWORD,
    });
  }

  /**
   * Xác thực reset password token
   * @param jwtService - JWT service instance
   * @param token - Token cần xác thực
   * @returns Token payload nếu hợp lệ
   * @throws Error nếu token không hợp lệ
   */
  static async verifyResetPasswordToken(
    jwtService: JwtService,
    token: string,
  ): Promise<TokenPayload> {
    return await jwtService.verifyAsync<TokenPayload>(token);
  }

  /**
   * Làm sạch dữ liệu nhạy cảm của người dùng
   * @param user - Thông tin người dùng
   * @returns Thông tin người dùng đã được làm sạch
   */
  static sanitizeUserData(user: NguoiDung): NguoiDung {
    const sanitized = { ...user };
    delete sanitized.mat_khau;
    delete sanitized.reset_pass_token;
    delete sanitized.otp_secret;
    return sanitized;
  }

  /**
   * Tính toán thời gian còn lại đến khi mở khóa tài khoản
   * @param lockUntil - Thời điểm mở khóa
   * @param now - Thời điểm hiện tại
   * @returns Object chứa số giây và số phút còn lại
   */
  static calculateLockTimeRemaining(
    lockUntil: moment.Moment,
    now: moment.Moment,
  ): { seconds: number; minutes: number } {
    return {
      seconds: lockUntil.diff(now, 'seconds'),
      minutes: lockUntil.diff(now, 'minutes'),
    };
  }

  /**
   * Tạo thông báo khóa tài khoản
   * @param lockUntil - Thời điểm mở khóa
   * @param now - Thời điểm hiện tại
   * @returns Thông báo khóa tài khoản
   */
  static generateLockMessage(
    lockUntil: moment.Moment,
    now: moment.Moment,
  ): string {
    const { seconds, minutes } = this.calculateLockTimeRemaining(
      lockUntil,
      now,
    );

    if (minutes < 1) {
      return `Tài khoản của bạn bị khoá. Vui lòng thử lại sau ${seconds} giây`;
    }

    return `Tài khoản của bạn bị khoá. Vui lòng thử lại sau ${minutes} phút`;
  }
}
