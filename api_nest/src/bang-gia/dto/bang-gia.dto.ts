import { IsNotEmpty, IsOptional, IsInt, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBangGiaDto {
  @IsNotEmpty({ message: 'Tên bảng giá không được để trống' })
  ten_bang_gia: string;

  @IsNotEmpty({ message: 'Đơn giá không được để trống' })
  @IsNumber({}, { message: 'Đơn giá phải là số' })
  @Type(() => Number)
  don_gia: number;

  @IsOptional()
  gio_bat_dau?: string;

  @IsOptional()
  gio_ket_thuc?: string;

  @IsOptional()
  @IsInt({ message: 'ID Loại sân phải là số nguyên' })
  @Type(() => Number)
  id_loai_san?: number;

  @IsOptional()
  @IsInt({ message: 'ID Đối tượng phải là số nguyên' })
  @Type(() => Number)
  id_doi_tuong?: number;

  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class UpdateBangGiaDto {
  @IsNotEmpty({ message: 'Tên bảng giá không được để trống' })
  ten_bang_gia: string;

  @IsNotEmpty({ message: 'Đơn giá không được để trống' })
  @IsNumber({}, { message: 'Đơn giá phải là số' })
  @Type(() => Number)
  don_gia: number;

  @IsOptional()
  gio_bat_dau?: string;

  @IsOptional()
  gio_ket_thuc?: string;

  @IsOptional()
  @IsInt({ message: 'ID Loại sân phải là số nguyên' })
  @Type(() => Number)
  id_loai_san?: number;

  @IsOptional()
  @IsInt({ message: 'ID Đối tượng phải là số nguyên' })
  @Type(() => Number)
  id_doi_tuong?: number;

  nguoi_cap_nhat?: number;
}
