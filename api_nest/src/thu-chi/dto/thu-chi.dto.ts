import { IsNotEmpty, IsOptional, IsInt, IsIn, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateThuChiDto {
  @IsNotEmpty({ message: 'Loại giao dịch không được để trống' })
  @IsInt({ message: 'Loại giao dịch phải là số nguyên' })
  @IsIn([0, 1], {
    message: 'Loại giao dịch chỉ nhận giá trị 0 (Chi) hoặc 1 (Thu)',
  })
  @Type(() => Number)
  loai_giao_dich: number;

  @IsNotEmpty({ message: 'Danh mục không được để trống' })
  danh_muc: string;

  @IsNotEmpty({ message: 'Số tiền không được để trống' })
  @IsNumber({}, { message: 'Số tiền phải là số' })
  @Type(() => Number)
  so_tien: number;

  @IsNotEmpty({ message: 'Ngày giao dịch không được để trống' })
  ngay_giao_dich: string;

  @IsOptional()
  mo_ta?: string;

  @IsOptional()
  @IsInt({ message: 'ID Người dùng phải là số nguyên' })
  @Type(() => Number)
  id_nguoi_dung?: number;

  @IsOptional()
  @IsInt({ message: 'ID Sân phải là số nguyên' })
  @Type(() => Number)
  id_san?: number;

  @IsOptional()
  ghi_chu?: string;

  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class UpdateThuChiDto {
  @IsOptional()
  @IsInt({ message: 'Loại giao dịch phải là số nguyên' })
  @IsIn([0, 1], {
    message: 'Loại giao dịch chỉ nhận giá trị 0 (Chi) hoặc 1 (Thu)',
  })
  @Type(() => Number)
  loai_giao_dich?: number;

  @IsOptional()
  danh_muc?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Số tiền phải là số' })
  @Type(() => Number)
  so_tien?: number;

  @IsOptional()
  ngay_giao_dich?: string;

  @IsOptional()
  mo_ta?: string;

  @IsOptional()
  @IsInt({ message: 'ID Người dùng phải là số nguyên' })
  @Type(() => Number)
  id_nguoi_dung?: number;

  @IsOptional()
  @IsInt({ message: 'ID Sân phải là số nguyên' })
  @Type(() => Number)
  id_san?: number;

  @IsOptional()
  ghi_chu?: string;

  nguoi_cap_nhat?: number;
}
