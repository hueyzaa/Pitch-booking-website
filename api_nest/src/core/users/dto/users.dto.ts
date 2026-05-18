import { IsNotContainSpecialCharacterForUser } from '@core/validators/is-contain-special-character-for-user.validator';
import { IsEmailCustom } from '@core/validators/is-email.validator';
import { IsNotEmptyCustom } from '@core/validators/is-not-empty.validator';
import { IsPhoneNumber } from '@core/validators/is-phone-number.validator';
import { IsValidPassword } from '@core/validators/is-valid-password.validator';
import { Transform } from 'class-transformer';
import { IsArray, Validate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

/**
 * DTO for creating a new user
 */
export class CreateUsersDto {
  /** Last name (Họ) */
  @Validate(IsNotEmptyCustom)
  ho: string;

  /** First name (Tên) */
  @Validate(IsNotEmptyCustom)
  ten: string;

  /** Username (Tài khoản) - automatically converted to uppercase */
  @Validate(IsNotEmptyCustom)
  @Validate(IsNotContainSpecialCharacterForUser)
  @Transform(({ value }) => value.toUpperCase())
  tai_khoan: string;

  /** Password (Mật khẩu) */
  @Validate(IsNotEmptyCustom)
  @Validate(IsValidPassword)
  mat_khau: string;

  /** Phone number (Số điện thoại) */
  @Validate(IsNotEmptyCustom)
  @Validate(IsPhoneNumber)
  so_dien_thoai: string;

  /** Date of birth (Ngày sinh) */
  @Validate(IsNotEmptyCustom)
  ngay_sinh: Date;

  /** Gender (Giới tính) - 0: Female, 1: Male */
  @Validate(IsNotEmptyCustom)
  gioi_tinh: number;

  /** Address (Địa chỉ) */
  @Validate(IsNotEmptyCustom)
  dia_chi: string;

  /** Province ID (Tỉnh) */
  @Validate(IsNotEmptyCustom)
  tinh_id: number;

  /** Ward ID (Xã) */
  @Validate(IsNotEmptyCustom)
  xa_id: number;

  /** Email address */
  @Validate(IsNotEmptyCustom)
  @Validate(IsEmailCustom)
  email: string;

  /** Role IDs (Danh sách ID vai trò) */
  @Validate(IsNotEmptyCustom)
  @IsArray({ message: 'vai_tro_ids phải là mảng' })
  vai_tro_ids: number[];

  /** Role code (Mã vai trò) - auto-generated from first role */
  ma_vai_tro?: string;

  /** Status (Trạng thái) - 0: Locked, 1: Active */
  @Validate(IsNotEmptyCustom)
  trang_thai: number;

  /** Full name (Họ và tên) - auto-generated */
  ho_va_ten?: string;

  /** Created by user ID */
  nguoi_tao?: number;

  /** Created date */
  ngay_tao?: string;

  /** Updated by user ID */
  nguoi_cap_nhat?: number;

  /** Updated date */
  ngay_cap_nhat?: string;
}

/**
 * DTO for updating an existing user
 * Extends CreateUsersDto but makes all fields optional except those explicitly required
 */
export class UpdateUsersDto extends PartialType(CreateUsersDto) {
  /** Last name (Họ) */
  @Validate(IsNotEmptyCustom)
  ho: string;

  /** First name (Tên) */
  @Validate(IsNotEmptyCustom)
  ten: string;

  /** Phone number (Số điện thoại) */
  @Validate(IsNotEmptyCustom)
  @Validate(IsPhoneNumber)
  so_dien_thoai: string;

  /** Date of birth (Ngày sinh) */
  @Validate(IsNotEmptyCustom)
  ngay_sinh: Date;

  /** Gender (Giới tính) - 0: Female, 1: Male */
  @Validate(IsNotEmptyCustom)
  gioi_tinh: number;

  /** Address (Địa chỉ) */
  @Validate(IsNotEmptyCustom)
  dia_chi: string;

  /** Province ID (Tỉnh) */
  @Validate(IsNotEmptyCustom)
  tinh_id: number;

  /** Ward ID (Xã) */
  @Validate(IsNotEmptyCustom)
  xa_id: number;

  /** Email address */
  @Validate(IsNotEmptyCustom)
  @Validate(IsEmailCustom)
  email: string;

  /** Role IDs (Danh sách ID vai trò) */
  vai_tro_ids: number[];

  /** Role code (Mã vai trò) - auto-generated from first role */
  ma_vai_tro?: string;

  /** Status (Trạng thái) - 0: Locked, 1: Active */
  @Validate(IsNotEmptyCustom)
  trang_thai: number;

  /** Full name (Họ và tên) - auto-generated */
  ho_va_ten?: string;

  /** Updated by user ID */
  nguoi_cap_nhat?: number;

  /** Updated date */
  ngay_cap_nhat?: string;
}

/**
 * Response DTO for Excel import operation
 */
export class ImportExcelResponseDto {
  /** Path to result file */
  filePath: string;

  /** Name of result file */
  fileName: string;

  /** Number of successfully imported records */
  successCount: number;

  /** Number of failed records */
  failCount: number;
}
