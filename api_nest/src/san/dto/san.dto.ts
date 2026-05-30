import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSanDto {
  @IsNotEmpty({ message: 'Tên sân không được để trống' })
  ten_san: string;

  @IsNotEmpty({ message: 'Loại sân không được để trống' })
  id_loai_san: number;

  @IsOptional()
  dia_chi?: string;

  @IsOptional()
  tinh_id?: number;

  @IsOptional()
  xa_id?: number;

  @IsOptional()
  tien_ich?: string[];

  @IsOptional()
  anh_chinh?: string;

  @IsOptional()
  anh_chi_tiet?: string;

  @IsOptional()
  mo_ta?: string;

  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class UpdateSanDto {
  @IsNotEmpty({ message: 'Tên sân không được để trống' })
  ten_san: string;

  @IsNotEmpty({ message: 'Loại sân không được để trống' })
  id_loai_san: number;

  @IsOptional()
  dia_chi?: string;

  @IsOptional()
  tinh_id?: number;

  @IsOptional()
  xa_id?: number;

  @IsOptional()
  tien_ich?: string[];

  @IsOptional()
  anh_chinh?: string;

  @IsOptional()
  anh_chi_tiet?: string;

  @IsOptional()
  mo_ta?: string;

  nguoi_cap_nhat?: number;
}
