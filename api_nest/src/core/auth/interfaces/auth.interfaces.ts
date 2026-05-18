import { NguoiDung } from '@database/entities/auth/nguoi-dung.entity';

/**
 * Dữ liệu theo dõi số lần đăng nhập thất bại
 */
export interface LoginAttemptData {
  /** Số lần đăng nhập thất bại */
  failedAttempts: number;
  /** Thời gian đăng nhập thất bại lần cuối (timestamp) */
  lastFailedTime: number;
}

/**
 * Kết quả trả về từ quá trình đăng nhập
 */
export interface LoginResult {
  /** Thông tin người dùng (nếu đăng nhập thành công) */
  user?: NguoiDung;
  /** Access token (nếu đăng nhập thành công) */
  token?: string;
  /** Yêu cầu xác thực OTP */
  requireOtp?: boolean;
  /** Email người dùng (dùng cho OTP) */
  email?: string;
  /** Cần cập nhật mật khẩu */
  need_update_password?: boolean;
  /** Yêu cầu xác thực reCAPTCHA */
  requireRecaptcha?: boolean;
  /** Thông báo lỗi */
  message?: string;
  /** Thời gian khóa tài khoản (milliseconds) */
  timeOut?: number;
}

/**
 * Thông tin thiết bị được lưu trong cache
 */
export interface DeviceInfo {
  /** Thiết bị đã được xác thực OTP */
  is_otp_verified: boolean;
  /** Thời gian hoạt động lần cuối (ISO string) */
  last_active: string;
}

/**
 * Danh sách thiết bị của người dùng
 * Key: device_id
 * Value: DeviceInfo
 */
export interface UserDevices {
  [deviceId: string]: DeviceInfo;
}

/**
 * Cấu hình hệ thống liên quan đến authentication
 */
export interface AuthConfig {
  /** Số lần đăng nhập thất bại tối đa trước khi khóa */
  MAX_FAILED_ATTEMPTS: number;
  /** Thời gian khóa tài khoản (milliseconds) */
  LOCK_TIME: number;
  /** Bật/tắt xác thực 2 yếu tố */
  TWO_FACTOR_AUTH: number;
  /** Thời gian hợp lệ của mật khẩu (ngày) */
  PASS_VALID_TIME: number;
  /** Thời gian hết hạn của OTP (milliseconds) */
  OTP_REAUTH_TTL: number;
  /** Bật/tắt kiểm tra mật khẩu hết hạn */
  CHECK_VALID_PASS: number;
  /** Bật/tắt yêu cầu reCAPTCHA */
  RECAPTCHA_REQUIRED: number;
}

/**
 * Payload cho JWT token
 */
export interface TokenPayload {
  /** Email người dùng */
  email: string;
  /** Tên tài khoản */
  tai_khoan: string;
  /** Thời gian tạo token */
  time: number;
}

/**
 * Options cho việc tạo JWT token
 */
export interface TokenOptions {
  /** Thời gian hết hạn (ví dụ: '1h', '7d') */
  expiresIn: string | number;
}
