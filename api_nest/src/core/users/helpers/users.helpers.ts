import { HttpCoreException } from '@core/exceptions/core.exception';
import { VaiTro } from '@database/entities/auth/vai-tro.entity';
import { CORE_COMMON_ERROR, HTTP_CODE } from '@configs/contanst';
import { Repository, In } from 'typeorm';
import * as _ from 'lodash';
import * as moment from 'moment';
import {
  Gender,
  GENDER_MAPPING,
  USER_EXCEL_COLUMNS,
  EXCEL_DATE_FORMAT,
  DB_DATE_FORMAT,
  DB_DATETIME_FORMAT,
} from '../constants/users.constants';
import { CreateUsersDto } from '../dto/users.dto';

/**
 * Build full name from first name and last name
 * @param ho - Last name (họ)
 * @param ten - First name (tên)
 * @returns Full name (họ và tên)
 */
export function buildFullName(ho: string, ten: string): string {
  return `${ho} ${ten}`.trim();
}

/**
 * Parse gender from Vietnamese text
 * @param genderText - Gender text in Vietnamese (e.g., "Nam", "Nữ")
 * @returns Gender enum value (0 for female, 1 for male)
 * @throws Error if gender text is invalid
 */
export function parseGenderFromVietnamese(genderText: string): Gender {
  const normalized = _.toLower(genderText)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, '');

  const gender = GENDER_MAPPING[normalized];

  if (gender === undefined) {
    throw new Error('Sai giới tính (chỉ chấp nhận "Nam" hoặc "Nữ")');
  }

  return gender;
}

/**
 * Validate role code and return role entity
 * @param roleCode - Role code to validate
 * @param vaiTroRepo - VaiTro repository
 * @returns VaiTro entity if valid
 * @throws HttpCoreException if role is invalid
 */
export async function validateRole(
  roleCode: string,
  vaiTroRepo: Repository<VaiTro>,
): Promise<VaiTro> {
  const role = await vaiTroRepo.findOneBy({ ma_vai_tro: roleCode });

  if (!role) {
    throw new HttpCoreException(
      CORE_COMMON_ERROR.ROLE_INVALID,
      HTTP_CODE.UNPROCESSABLE_CONTENT,
    );
  }

  return role;
}

/**
 * Map Excel row data to CreateUsersDto
 * @param row - Excel row data
 * @param userId - ID of user performing the import
 * @returns CreateUsersDto instance
 */
export function mapExcelRowToUserDto(row: any, userId: number): CreateUsersDto {
  const userData = new CreateUsersDto();
  const now = moment().utcOffset('+07:00').format(DB_DATETIME_FORMAT);

  Object.assign(userData, {
    ho: row[USER_EXCEL_COLUMNS.HO],
    ten: row[USER_EXCEL_COLUMNS.TEN],
    tai_khoan: row[USER_EXCEL_COLUMNS.TAI_KHOAN],
    mat_khau: row[USER_EXCEL_COLUMNS.MAT_KHAU],
    so_dien_thoai: row[USER_EXCEL_COLUMNS.SO_DIEN_THOAI],
    ngay_sinh: moment(
      row[USER_EXCEL_COLUMNS.NGAY_SINH],
      EXCEL_DATE_FORMAT,
    ).format(DB_DATE_FORMAT),
    gioi_tinh: parseGenderFromVietnamese(row[USER_EXCEL_COLUMNS.GIOI_TINH]),
    dia_chi: row[USER_EXCEL_COLUMNS.DIA_CHI],
    tinh_id: row[USER_EXCEL_COLUMNS.TINH_ID],
    xa_id: row[USER_EXCEL_COLUMNS.XA_ID],
    email: row[USER_EXCEL_COLUMNS.EMAIL] || null,
    ma_vai_tro: row[USER_EXCEL_COLUMNS.MA_VAI_TRO],
    trang_thai: row[USER_EXCEL_COLUMNS.TRANG_THAI],
    nguoi_tao: userId,
    ngay_tao: now,
    nguoi_cap_nhat: userId,
    ngay_cap_nhat: now,
  });

  return userData;
}

/**
 * Format import result for response
 * @param success - Array of successfully imported users
 * @param fail - Array of failed imports with error messages
 * @param pathResult - Path to result file
 * @returns Formatted import result
 */
export function formatImportResult(
  success: any[],
  fail: any[],
  pathResult: string,
) {
  return {
    success: success.length,
    fail: fail.length,
    danh_sach_thanh_cong: success,
    danh_sach_that_bai: fail,
    path_result: pathResult,
  };
}

/**
 * Validate multiple roles and return role entities
 * @param roleIds - Array of role IDs to validate
 * @param vaiTroRepo - VaiTro repository
 * @returns Array of validated role entities
 * @throws HttpCoreException if any role is invalid
 */
export async function validateMultipleRoles(
  roleIds: number[],
  vaiTroRepo: Repository<VaiTro>,
): Promise<VaiTro[]> {
  if (!roleIds || roleIds.length === 0) {
    throw new HttpCoreException(
      'Danh sách vai trò không được để trống',
      HTTP_CODE.UNPROCESSABLE_CONTENT,
    );
  }

  const roles = await vaiTroRepo.find({
    where: {
      id: In(roleIds),
    },
  });

  if (roles.length !== roleIds.length) {
    throw new HttpCoreException(
      CORE_COMMON_ERROR.ROLE_INVALID,
      HTTP_CODE.UNPROCESSABLE_CONTENT,
    );
  }

  return roles;
}

/**
 * Create user-role mapping objects
 * @param userId - User ID
 * @param roleIds - Array of role IDs
 * @returns Array of user-role mapping objects
 */
export function createUserRoleMappings(
  userId: number,
  roleIds: number[],
): Array<{ nguoi_dung_id: number; vai_tro_id: number }> {
  return roleIds.map((roleId) => ({
    nguoi_dung_id: userId,
    vai_tro_id: roleId,
  }));
}

/**
 * Sanitize user response by removing sensitive fields
 * @param user - User object
 * @returns Sanitized user object
 */
export function sanitizeUserResponse(user: any): any {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mat_khau, reset_pass_token, otp_secret, ...sanitized } = user;
  return sanitized;
}
