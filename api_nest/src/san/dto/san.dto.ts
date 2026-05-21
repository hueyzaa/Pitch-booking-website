import { IsNotEmpty } from 'class-validator';

export class CreateSanDto {
  @IsNotEmpty({ message: 'Tên sân không được để trống' })
  ten_san: string;

  @IsNotEmpty({ message: 'Loại sân không được để trống' })
  id_loai_san: number;

  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class UpdateSanDto {
  @IsNotEmpty({ message: 'Tên sân không được để trống' })
  ten_san: string;

  @IsNotEmpty({ message: 'Loại sân không được để trống' })
  id_loai_san: number;

  nguoi_cap_nhat?: number;
}
