import { IsNotEmpty, IsOptional, IsEmail, IsInt } from 'class-validator';

export class CreateKhachHangDto {
  @IsNotEmpty({ message: 'Họ và tên không được để trống' })
  ho_va_ten: string;

  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  so_dien_thoai: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email?: string;

  @IsOptional()
  dia_chi?: string;

  @IsOptional()
  ngay_sinh?: string;

  @IsOptional()
  @IsInt({ message: 'Giới tính không hợp lệ' })
  gioi_tinh?: number;

  @IsNotEmpty({ message: 'Đối tượng không được để trống' })
  @IsInt({ message: 'ID Đối tượng phải là số nguyên' })
  id_doi_tuong: number;

  @IsOptional()
  ho?: string;

  @IsOptional()
  ten?: string;

  @IsOptional()
  tai_khoan?: string;

  @IsOptional()
  mat_khau?: string;

  @IsOptional()
  @IsInt({ message: 'ID Tỉnh phải là số nguyên' })
  tinh_id?: number;

  @IsOptional()
  @IsInt({ message: 'ID Xã phải là số nguyên' })
  xa_id?: number;

  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class UpdateKhachHangDto {
  @IsNotEmpty({ message: 'Họ và tên không được để trống' })
  ho_va_ten: string;

  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  so_dien_thoai: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email?: string;

  @IsOptional()
  dia_chi?: string;

  @IsOptional()
  ngay_sinh?: string;

  @IsOptional()
  @IsInt({ message: 'Giới tính không hợp lệ' })
  gioi_tinh?: number;

  @IsNotEmpty({ message: 'Đối tượng không được để trống' })
  @IsInt({ message: 'ID Đối tượng phải là số nguyên' })
  id_doi_tuong: number;

  @IsOptional()
  ho?: string;

  @IsOptional()
  ten?: string;

  @IsOptional()
  tai_khoan?: string;

  @IsOptional()
  mat_khau?: string;

  @IsOptional()
  @IsInt({ message: 'ID Tỉnh phải là số nguyên' })
  tinh_id?: number;

  @IsOptional()
  @IsInt({ message: 'ID Xã phải là số nguyên' })
  xa_id?: number;

  nguoi_cap_nhat?: number;
}
