import { IsNotEmpty, IsOptional, IsInt, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuanLyGiaDto {
  @IsNotEmpty({ message: 'Sân không được để trống' })
  @IsInt({ message: 'ID Sân phải là số nguyên' })
  @Type(() => Number)
  id_san: number;

  @IsOptional()
  @IsInt({ message: 'ID Bảng giá phải là số nguyên' })
  @Type(() => Number)
  id_bang_gia?: number;

  @IsOptional()
  @IsInt({ message: 'ID Loại đối tượng phải là số nguyên' })
  @Type(() => Number)
  id_doi_tuong?: number;

  @IsNotEmpty({ message: 'Giá sân theo giờ không được để trống' })
  @IsInt({ message: 'Giá sân theo giờ phải là số nguyên' })
  @Type(() => Number)
  gia_theo_gio: number;

  @IsOptional()
  ngay_bat_dau?: string;

  @IsOptional()
  ngay_ket_thuc?: string;

  @IsOptional()
  @IsInt({ message: 'Trạng thái phải là số nguyên' })
  @IsIn([0, 1], { message: 'Trạng thái chỉ nhận giá trị 0 hoặc 1' })
  @Type(() => Number)
  trang_thai?: number;

  @IsOptional()
  ghi_chu?: string;

  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class UpdateQuanLyGiaDto {
  @IsNotEmpty({ message: 'Sân không được để trống' })
  @IsInt({ message: 'ID Sân phải là số nguyên' })
  @Type(() => Number)
  id_san: number;

  @IsOptional()
  @IsInt({ message: 'ID Bảng giá phải là số nguyên' })
  @Type(() => Number)
  id_bang_gia?: number;

  @IsOptional()
  @IsInt({ message: 'ID Loại đối tượng phải là số nguyên' })
  @Type(() => Number)
  id_doi_tuong?: number;

  @IsNotEmpty({ message: 'Giá sân theo giờ không được để trống' })
  @IsInt({ message: 'Giá sân theo giờ phải là số nguyên' })
  @Type(() => Number)
  gia_theo_gio: number;

  @IsOptional()
  ngay_bat_dau?: string;

  @IsOptional()
  ngay_ket_thuc?: string;

  @IsOptional()
  @IsInt({ message: 'Trạng thái phải là số nguyên' })
  @IsIn([0, 1], { message: 'Trạng thái chỉ nhận giá trị 0 hoặc 1' })
  @Type(() => Number)
  trang_thai?: number;

  @IsOptional()
  ghi_chu?: string;

  nguoi_cap_nhat?: number;
}
