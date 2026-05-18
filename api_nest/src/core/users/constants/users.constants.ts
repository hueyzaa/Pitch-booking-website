/**
 * User module constants
 * Contains all constant values used in the user module
 */

/**
 * Gender enum
 */
export enum Gender {
  FEMALE = 0,
  MALE = 1,
}

/**
 * Gender mapping from Vietnamese text
 */
export const GENDER_MAPPING: Record<string, Gender> = {
  nam: Gender.MALE,
  nu: Gender.FEMALE,
};

/**
 * Excel column mapping for user import
 */
export const USER_EXCEL_COLUMNS = {
  HO: 'A',
  TEN: 'B',
  TAI_KHOAN: 'C',
  MAT_KHAU: 'D',
  SO_DIEN_THOAI: 'E',
  NGAY_SINH: 'F',
  GIOI_TINH: 'G',
  DIA_CHI: 'H',
  TINH_ID: 'I',
  XA_ID: 'J',
  EMAIL: 'K',
  MA_VAI_TRO: 'L',
  TRANG_THAI: 'M',
} as const;

/**
 * Excel headers for user export
 */
export const USER_EXCEL_HEADERS = [
  'Họ',
  'Tên',
  'Tài khoản',
  'Mật khẩu',
  'Số điện thoại',
  'Ngày sinh',
  'Giới tính',
  'Địa chỉ',
  'Tỉnh',
  'Xã',
  'Email',
  'Mã vai trò',
  'Trạng thái',
];

/**
 * Allowed MIME types for Excel file upload
 */
export const ALLOWED_EXCEL_MIME_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];

/**
 * Date format for Excel import
 */
export const EXCEL_DATE_FORMAT = 'DD/MM/YYYY';

/**
 * Database date format
 */
export const DB_DATE_FORMAT = 'YYYY-MM-DD';

/**
 * Database datetime format
 */
export const DB_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
