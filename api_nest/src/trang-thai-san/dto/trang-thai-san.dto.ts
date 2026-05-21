import { IsNotEmpty, IsOptional, IsInt, IsIn, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTrangThaiSanDto {
  @IsNotEmpty({ message: 'Sân không được để trống' })
  @IsInt({ message: 'ID Sân phải là số nguyên' })
  @Type(() => Number)
  id_san: number;

  @IsNotEmpty({ message: 'Ngày không được để trống' })
  @IsString({ message: 'Ngày phải là chuỗi' })
  ngay: string;

  @IsNotEmpty({ message: 'Giờ bắt đầu không được để trống' })
  @IsString({ message: 'Giờ bắt đầu phải là chuỗi' })
  gio_bat_dau: string;

  @IsNotEmpty({ message: 'Giờ kết thúc không được để trống' })
  @IsString({ message: 'Giờ kết thúc phải là chuỗi' })
  gio_ket_thuc: string;

  @IsNotEmpty({ message: 'Trạng thái không được để trống' })
  @IsInt({ message: 'Trạng thái phải là số nguyên' })
  @IsIn([0, 1, 2], { message: 'Trạng thái chỉ nhận giá trị 0 (Trống), 1 (Đã đặt) hoặc 2 (Bảo trì)' })
  @Type(() => Number)
  trang_thai: number;

  @IsOptional()
  @IsString({ message: 'Ghi chú phải là chuỗi' })
  ghi_chu?: string;

  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class UpdateTrangThaiSanDto {
  @IsOptional()
  @IsInt({ message: 'ID Sân phải là số nguyên' })
  @Type(() => Number)
  id_san?: number;

  @IsOptional()
  @IsString({ message: 'Ngày phải là chuỗi' })
  ngay?: string;

  @IsOptional()
  @IsString({ message: 'Giờ bắt đầu phải là chuỗi' })
  gio_bat_dau?: string;

  @IsOptional()
  @IsString({ message: 'Giờ kết thúc phải là chuỗi' })
  gio_ket_thuc?: string;

  @IsOptional()
  @IsInt({ message: 'Trạng thái phải là số nguyên' })
  @IsIn([0, 1, 2], { message: 'Trạng thái chỉ nhận giá trị 0 (Trống), 1 (Đã đặt) hoặc 2 (Bảo trì)' })
  @Type(() => Number)
  trang_thai?: number;

  @IsOptional()
  @IsString({ message: 'Ghi chú phải là chuỗi' })
  ghi_chu?: string;

  nguoi_cap_nhat?: number;
}
