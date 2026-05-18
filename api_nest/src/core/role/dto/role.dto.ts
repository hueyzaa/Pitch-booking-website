import { IsNotEmptyCustom } from '@core/validators/is-not-empty.validator';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { Validate } from 'class-validator';

export class CreateRoleDto {
  @Validate(IsNotEmptyCustom)
  @Transform(({ value }) => value.toUpperCase())
  ten_vai_tro: string;

  @Validate(IsNotEmptyCustom)
  ma_vai_tro: string;

  @Validate(IsNotEmptyCustom)
  phan_quyen: any;

  nguoi_tao: number;
  nguoi_cap_nhat: number;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  id: number;
  is_active?: boolean;
  ngay_cap_nhat?: Date;
  nguoi_cap_nhat?: number;
}
