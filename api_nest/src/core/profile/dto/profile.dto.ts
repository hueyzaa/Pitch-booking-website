import { IsEqualTo } from '@core/decorators/is-equal-to.decorator';
import { IsEmailCustom } from '@core/validators/is-email.validator';
import { IsNotEmptyCustom } from '@core/validators/is-not-empty.validator';
import { IsPhoneNumber } from '@core/validators/is-phone-number.validator';
import { IsValidPassword } from '@core/validators/is-valid-password.validator';
import { IsOptional, Validate } from 'class-validator';

export class UpdateSelfDto {
  @Validate(IsNotEmptyCustom)
  @Validate(IsEmailCustom)
  email: string | null;
  @Validate(IsNotEmptyCustom)
  ho: string;
  @Validate(IsNotEmptyCustom)
  ten: string;
  @Validate(IsNotEmptyCustom)
  ngay_sinh: Date;
  @Validate(IsNotEmptyCustom)
  gioi_tinh: number;
  @Validate(IsNotEmptyCustom)
  dia_chi: string;
  @Validate(IsNotEmptyCustom)
  tinh_id: number;
  @IsOptional()
  @Validate(IsNotEmptyCustom)
  huyen_id: number;
  @Validate(IsNotEmptyCustom)
  xa_id: number;
  @Validate(IsNotEmptyCustom)
  @Validate(IsPhoneNumber)
  so_dien_thoai: string;

  //? Tự ghép lại
  ho_va_ten: string;
  nguoi_cap_nhat: number | null;
  ngay_cap_nhat: Date;
}

export class ChangePasswordDto {
  mat_khau_hien_tai: string;
  is_first_change: number;

  @Validate(IsNotEmptyCustom)
  @Validate(IsValidPassword)
  mat_khau_moi: string;

  @Validate(IsNotEmptyCustom)
  @Validate(IsValidPassword)
  @IsEqualTo('mat_khau_moi')
  mat_khau_moi_xac_nhan: string;
}

export class UpdatePasswordDto {
  @Validate(IsNotEmptyCustom)
  @Validate(IsValidPassword)
  mat_khau_moi: string;
  @Validate(IsNotEmptyCustom)
  @Validate(IsValidPassword)
  mat_khau_moi_xac_nhan: string;
}
