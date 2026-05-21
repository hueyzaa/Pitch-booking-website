export interface KhachHangEntity {
  id: number;
  ho_va_ten: string;
  so_dien_thoai: string;
  email: string | null;
  dia_chi: string | null;
  ngay_sinh: string | null;
  gioi_tinh: number | null;
  id_doi_tuong: number;
  ten_doi_tuong: string;
  ngay_tao: string;
  ten_nguoi_tao: string;
  ngay_cap_nhat: string;
  ten_nguoi_cap_nhat: string;
}

export interface KhachHangFormValues {
  ho_va_ten: string;
  so_dien_thoai: string;
  email?: string;
  dia_chi?: string;
  ngay_sinh?: string;
  gioi_tinh?: number;
  id_doi_tuong: number;
}
