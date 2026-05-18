export const HTTP_CODE = {
  FORBIDDEN: '403',
  UNPROCESSABLE_CONTENT: '422',
  NOT_FOUND: '404',
  UNAUTHORIZED: '401',
  INTERNAL_ERROR: '500',
  OK: '200',
  BAD_REQUEST: '400',
};

export const DATABASE_GENERAL_ERROR = {
  DUPLICATE_ENTRY: 'Duplicate entry',
  FOREIGN_KEY:
    'Cannot delete or update a parent row: a foreign key constraint fails',
  ER_NO_REFERENCED_ROW_2: 'ER_NO_REFERENCED_ROW_2',
  DATA_TOO_LONG: 'Data too long',
  NOT_NULL: 'cannot be null',
  INVALID_DATETIME: 'Incorrect datetime value',
  ER_WARN_DATA_OUT_OF_RANGE: 'ER_WARN_DATA_OUT_OF_RANGE',
};

export const CORE_COMMON_MESSAGE = {
  LOGOUT_SUCCESS: 'Đăng xuất thành công',
  RESET_PASSWORD_SUCCESS:
    'Đặt lại mật khẩu thành công vui lòng đăng nhập lại bằng tài khoản mới',
  FORGOT_PASSWORD_SUCCESS:
    'Quên mật khẩu thành công vui lòng kiểm tra Email và làm theo hướng dẫn',
  CHANGE_PASSWORD_SUCCESS: 'Đổi mật khẩu thành công',
  DELETE_PASSWORD_SUCCESS: 'Tài khoản đã xoá thành công',
  SET_FIREBASE_TOKEN_SUCCESS: 'Cập nhật token firebase thành công',
};

export const CORE_COMMON_ERROR = {
  RECAPTCHA_REQUIRED: 'Vui lòng hoàn thành reCAPTCHA để tiếp tục',
  TOKEN_NOT_FOUND: 'Token không tồn tại',
  MISSING_DEVICE_ID: 'Device ID không tồn tại',
  MISSING_TOKEN: 'Gửi lên thiếu token',
  INVALID_DEVICE_ID: 'Device ID không hợp lệ',
  DUPLICATE_ENTRY: 'Dữ liệu đã tồn tại vui lòng kiểm tra lại',
  UNKNOWN_ERROR: 'Đã có lỗi xảy ra',
  PERMISSION_DENY: 'Bạn không có quyền thực thi tài nguyên này',
  SAVE_SESSION_FAILED: 'Xảy ra lỗi khi lưu phiên đăng nhập',
  NOT_FOUND_OR_INACTIVE: 'Người dùng không tồn tại hoặc bị khoá',
  NOT_CORRECT_CURRENT_PASSWORD:
    'Mật khẩu hiện tại chưa đúng vui lòng kiểm tra lại',
  NOT_FOUND_CURRENT_PASSWORD: 'Vui lòng nhập trường mật khẩu hiện tại',
  INVALID_TOKEN: 'Token không hợp lệ',
  RESET_PASSWORD_SESSION_EXPIRES:
    'Phiên đã hết hạn vui lòng thực hiện lại thao tác quên mật khẩu',
  INVALID_USERNAME_OR_PASSWORD:
    'Tài khoản hoặc mật khẩu không hợp lệ vui lòng kiểm tra lại',
  NOT_DETECT_DEVICE: 'Không xác định được thiết bị',
  ROLE_INVALID: 'Vai trò không hợp lệ',
  FOREIGN_KEY_EXCEPTION:
    'Không thể xóa hoặc thay đổi vì dữ liệu có ràng buộc với dữ liệu khác',
  INVALID_EMAIL: 'Email không hợp lệ vui lòng kiểm tra lại',
  INVALID_TIME_FORMAT: 'Thời gian không hợp lệ vui lòng kiểm tra lại',
  NOT_WORKING_HOURS: 'Không phải thời gian làm việc vui lòng thử lại sau',
  NOT_FOUND: 'Không tìm thấy dữ liệu',
  INVALID_OTP: 'Mã OTP không hợp lệ hoặc đã hết hạn',
  FILE_NOT_FOUND: 'File không tồn tại',
  DATA_TOO_LONG: 'Dữ liệu quá dài',
  NOT_NULL: 'Không được để trống',
  INVALID_DATETIME: 'Thời gian không hợp lệ',
  ER_WARN_DATA_OUT_OF_RANGE: 'Dữ liệu vượt quá phạm vi cho phép',
  ENOENT: 'Không tìm thấy tệp hoặc thư mục',
};

export const CORE_COMMON_ERROR_CUSTOM = {
  INVALID_LOGIN_ATTEMPTS: (remainingAttempts: number) =>
    `Tài khoản hoặc mật khẩu không hợp lệ. Đăng nhập thất bại. Bạn còn ${remainingAttempts} lần thử.`,
  ACCOUNT_LOCKED: (timeOut: number) =>
    `Tài khoản của bạn bị khoá trong ${timeOut} phút`,
};

export enum STATUS {
  INACTIVE,
  ACTIVE,
}

export enum GENDER {
  FEMALE,
  MALE,
}

export const ROLE = {
  ADMIN: 'Admin',
  USER: 'User',
};

export const isAdminRole = [
  'Admin',
  'ADMIN',
  'super-admin',
  'SUPER-ADMIN',
  'SUPER_ADMIN',
  'SuperAdmin',
  'super_admin',
];

export const keyConfig = [
  'MAX_FAILED_ATTEMPTS',
  'LOCK_TIME',
  'TWO_FACTOR_AUTH',
  'OTP_REAUTH_TTL',
  'ACCESS_TIME_LIMIT',
  'PASS_VALID_TIME',
  'CHECK_VALID_PASS',
  'RECAPTCHA_REQUIRED',
];

export const validDay = [
  'thứ 2',
  'thứ 3',
  'thứ 4',
  'thứ 5',
  'thứ 6',
  'thứ 7',
  'chủ nhật',
];

export const LOAI_FILE = {
  SECRET: '0SECRET',
  PUBLIC: '1PUBLIC',
};
export const IS_OTP_VERIFY = {
  NOT_VERIFY: 0,
  VERIFY: 1,
};
export const VALID_PASS = {
  NOT_VALID: 0,
  VALID: 1,
};
export const CONFIG_KEY_AND_DEFAULT_VALUE = {
  MAX_FAILED_ATTEMPTS: { key: 'MAX_FAILED_ATTEMPTS', defaultValue: '5' },
  LOCK_TIME: { key: 'LOCK_TIME', defaultValue: '180000' },
  TWO_FACTOR_AUTH: { key: 'TWO_FACTOR_AUTH', defaultValue: '0' },
  PASS_VALID_TIME: { key: 'PASS_VALID_TIME', defaultValue: '90' },
  OTP_REAUTH_TTL: { key: 'OTP_REAUTH_TTL', defaultValue: '7200000' },
  CHECK_VALID_PASS: { key: 'CHECK_VALID_PASS', defaultValue: '0' },
  RECAPTCHA_REQUIRED: { key: 'RECAPTCHA_REQUIRED', defaultValue: '1' },
};

export const IMPORT_TYPE = {
  NGUOI_DUNG: 'Người dùng',
};

export const IMPORT_DESTINATION = {
  RESULT: 'public/imports_result',
};

export const expectedHeader = [
  //cấu trúc header mong muốn
  `Họ và tên`,
  `Giới tính`,
  `Ngày sinh`,
  `Email`,
  `SĐT`,
  `Mật khẩu`,
  `Vai trò`,
];
