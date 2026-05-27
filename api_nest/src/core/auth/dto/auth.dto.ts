import { IsNotEmptyCustom } from '@core/validators/is-not-empty.validator';
import { IsValidPassword } from '@core/validators/is-valid-password.validator';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

// ============================================================================
// Login DTOs
// ============================================================================

/**
 * DTO cho đăng nhập
 *
 * @class LoginUserDto
 * @description Chứa thông tin đăng nhập của người dùng.
 * Hỗ trợ đăng nhập bằng username, email hoặc số điện thoại.
 *
 * @example
 * ```typescript
 * const loginDto: LoginUserDto = {
 *   tai_khoan: 'user01',
 *   mat_khau: 'Password123!',
 *   firebase_token: 'fcm-token-optional'
 * };
 * ```
 */
export class LoginUserDto {
  /**
   * Tài khoản đăng nhập
   *
   * @type {string}
   * @description Có thể là username, email hoặc số điện thoại
   * - Username: chữ cái, số, dấu gạch dưới (VD: user_name01)
   * - Email: định dạng email chuẩn (VD: user@example.com)
   * - Số điện thoại: 9-15 chữ số (VD: 0123456789)
   *
   * @minLength 4
   * @maxLength 32
   */
  @IsNotEmpty({ message: 'Tài khoản không được để trống' })
  @IsString({ message: 'Tài khoản phải là chuỗi' })
  @Matches(
    /^([a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*|[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)+|(\+?\d{9,15}|0\d{9,10}))$/,
    {
      message:
        'Tài khoản không đúng định dạng (VD: user_name01 hoặc username01 hoặc email@domain.com hoặc số điện thoại)',
    },
  )
  @MinLength(4, { message: 'Tài khoản phải có ít nhất 4 ký tự' })
  @MaxLength(32, { message: 'Tài khoản không được vượt quá 32 ký tự' })
  @Transform(({ value }) => {
    if (value.includes('@')) {
      return value.trim().toLowerCase();
    }
    return value.trim().toUpperCase();
  })
  tai_khoan: string;

  /**
   * Mật khẩu
   *
   * @type {string}
   * @description Mật khẩu của người dùng
   *
   * @minLength 8
   * @maxLength 32
   */
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  @MaxLength(32, { message: 'Mật khẩu không được vượt quá 32 ký tự' })
  mat_khau: string;

  /**
   * Firebase Cloud Messaging token
   *
   * @type {string}
   * @description Token FCM cho push notification (dành cho Mobile)
   * @optional
   */
  firebase_token?: string;
  
  /**
   * Phân biệt luồng đăng nhập (admin / public)
   * 
   * @type {string}
   * @optional
   */
  app_type?: string;
}

// ============================================================================
// Password Management DTOs
// ============================================================================

/**
 * DTO cho đặt lại mật khẩu
 *
 * @class ResetPasswordDto
 * @description Chứa token reset password và mật khẩu mới
 *
 * @example
 * ```typescript
 * const resetDto: ResetPasswordDto = {
 *   token_reset_pass: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   mat_khau_moi: 'NewPassword123!'
 * };
 * ```
 */
export class ResetPasswordDto {
  /**
   * Token reset password
   *
   * @type {string}
   * @description JWT token nhận được từ email reset password
   */
  @Validate(IsNotEmptyCustom)
  token_reset_pass: string;

  /**
   * Mật khẩu mới
   *
   * @type {string}
   * @description Mật khẩu mới phải đáp ứng các yêu cầu bảo mật
   * - Ít nhất 8 ký tự
   * - Chứa chữ hoa, chữ thường, số và ký tự đặc biệt
   */
  @Validate(IsNotEmptyCustom)
  @Validate(IsValidPassword)
  mat_khau_moi: string;
}

/**
 * DTO cho quên mật khẩu
 *
 * @class ForgotPassDto
 * @description Chứa thông tin tài khoản và email để gửi link reset password
 *
 * @example
 * ```typescript
 * const forgotDto: ForgotPassDto = {
 *   tai_khoan: 'user01',
 *   email: 'user@example.com'
 * };
 * ```
 */
export class ForgotPassDto {
  /**
   * Tài khoản
   *
   * @type {string}
   * @description Username, email hoặc số điện thoại của người dùng
   */
  @Validate(IsNotEmptyCustom)
  tai_khoan: string;

  /**
   * Email
   *
   * @type {string}
   * @description Email để nhận link reset password
   */
  @Validate(IsNotEmptyCustom)
  email: string;
}

// ============================================================================
// Session Management DTOs
// ============================================================================

/**
 * DTO cho đăng xuất
 *
 * @class LogOutDto
 * @description Chứa thông tin người dùng và thiết bị để đăng xuất
 *
 * @example
 * ```typescript
 * const logoutDto: LogOutDto = {
 *   nguoi_dung_id: 1,
 *   device_id: 'device-uuid-123'
 * };
 * ```
 */
export class LogOutDto {
  /**
   * ID người dùng
   *
   * @type {number}
   * @description ID của người dùng cần đăng xuất
   */
  @Validate(IsNotEmptyCustom)
  nguoi_dung_id: number;

  /**
   * ID thiết bị
   *
   * @type {string}
   * @description UUID của thiết bị cần đăng xuất
   */
  @Validate(IsNotEmptyCustom)
  device_id: string;
}

// ============================================================================
// Two-Factor Authentication DTOs
// ============================================================================

/**
 * DTO cho xác thực OTP
 *
 * @class VerifyOtpDto
 * @description Chứa email và mã OTP để xác thực 2FA
 *
 * @example
 * ```typescript
 * const verifyDto: VerifyOtpDto = {
 *   email: 'user@example.com',
 *   otp: '123456'
 * };
 * ```
 */
export class VerifyOtpDto {
  /**
   * Email
   *
   * @type {string}
   * @description Email của người dùng nhận mã OTP
   */
  @Validate(IsNotEmptyCustom)
  email: string;

  /**
   * Mã OTP
   *
   * @type {string}
   * @description Mã OTP 6 chữ số nhận được qua email
   */
  @Validate(IsNotEmptyCustom)
  otp: string;
}

// ============================================================================
// Device & Role Management DTOs
// ============================================================================

/**
 * DTO cho cập nhật Firebase token
 *
 * @class SetFirebaseTokenDto
 * @description Chứa Firebase token cho push notification
 *
 * @example
 * ```typescript
 * const tokenDto: SetFirebaseTokenDto = {
 *   firebase_token: 'fcm-token-here'
 * };
 * ```
 */
export class SetFirebaseTokenDto {
  /**
   * Firebase Cloud Messaging token
   *
   * @type {string}
   * @description Token FCM cho push notification
   * @optional
   */
  firebase_token?: string;
}

/**
 * DTO cho cập nhật vai trò cá nhân
 *
 * @class UpdatePersonalRoleDto
 * @description Chứa mã vai trò mới cho người dùng
 *
 * @example
 * ```typescript
 * const roleDto: UpdatePersonalRoleDto = {
 *   ma_vai_tro: 'ADMIN'
 * };
 * ```
 */
export class UpdatePersonalRoleDto {
  /**
   * Mã vai trò
   *
   * @type {string}
   * @description Mã vai trò mới (VD: 'ADMIN', 'USER', 'MANAGER')
   */
  ma_vai_tro: string;
}
