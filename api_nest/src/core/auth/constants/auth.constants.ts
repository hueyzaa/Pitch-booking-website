/**
 * Cache keys cho auth module
 */
export const AUTH_CACHE_KEYS = {
  /**
   * Key cho cache dữ liệu đăng nhập tạm thời
   * @param username - Tên đăng nhập
   */
  LOGIN_TEMP: (username: string) => `loginTemp:${username}`,

  /**
   * Key cho cache danh sách thiết bị của người dùng
   * @param userId - ID người dùng
   */
  USER_DEVICES: (userId: number) => `user_devices:${userId}`,
} as const;

/**
 * Thời gian hết hạn của các loại token (tính bằng giây)
 */
export const TOKEN_EXPIRY = {
  /** Token reset mật khẩu hết hạn sau 3 phút */
  RESET_PASSWORD: 60 * 3,

  /** Token cập nhật mật khẩu hết hạn sau 1 ngày */
  UPDATE_PASSWORD: 60 * 60 * 24,
} as const;

/**
 * Danh sách config keys cần lấy từ GlobalConfig
 */
export const AUTH_CONFIG_KEYS = [
  'MAX_FAILED_ATTEMPTS',
  'LOCK_TIME',
  'TWO_FACTOR_AUTH',
  'PASS_VALID_TIME',
  'OTP_REAUTH_TTL',
  'CHECK_VALID_PASS',
  'RECAPTCHA_REQUIRED',
] as const;
