import { IsNotEmpty, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateDoiTuongDto {
  @IsNotEmpty({ message: 'Tên đối tượng không được để trống' })
  ten_doi_tuong: string;

  @IsOptional()
  @IsInt({ message: 'Phần trăm giảm giá phải là số nguyên' })
  @Min(0, { message: 'Phần trăm giảm giá tối thiểu là 0' })
  @Max(100, { message: 'Phần trăm giảm giá tối đa là 100' })
  phan_tram_giam_gia?: number;

  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class UpdateDoiTuongDto {
  @IsNotEmpty({ message: 'Tên đối tượng không được để trống' })
  ten_doi_tuong: string;

  @IsOptional()
  @IsInt({ message: 'Phần trăm giảm giá phải là số nguyên' })
  @Min(0, { message: 'Phần trăm giảm giá tối thiểu là 0' })
  @Max(100, { message: 'Phần trăm giảm giá tối đa là 100' })
  phan_tram_giam_gia?: number;

  nguoi_cap_nhat?: number;
}
