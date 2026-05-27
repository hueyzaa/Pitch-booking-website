import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateDanhGiaDto {
  @IsNotEmpty()
  @IsNumber()
  id_nguoi_dung: number;

  @IsNotEmpty()
  @IsNumber()
  id_san: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  so_sao: number;

  @IsOptional()
  @IsString()
  noi_dung?: string;

  @IsOptional()
  @IsNumber()
  trang_thai?: number;

  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class UpdateDanhGiaDto {
  @IsOptional()
  @IsNumber()
  id_nguoi_dung?: number;

  @IsOptional()
  @IsNumber()
  id_san?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  so_sao?: number;

  @IsOptional()
  @IsString()
  noi_dung?: string;

  @IsOptional()
  @IsNumber()
  trang_thai?: number;

  nguoi_cap_nhat?: number;
}

export class PublicCreateDanhGiaDto {
  @IsNotEmpty({ message: 'Tài khoản không được bỏ trống' })
  @IsString()
  tai_khoan: string;

  @IsNotEmpty({ message: 'Sân không được bỏ trống' })
  @IsNumber()
  id_san: number;

  @IsNotEmpty({ message: 'Số sao không được bỏ trống' })
  @IsNumber()
  @Min(1, { message: 'Số sao tối thiểu là 1' })
  @Max(5, { message: 'Số sao tối đa là 5' })
  so_sao: number;

  @IsOptional()
  @IsString()
  noi_dung?: string;
}
