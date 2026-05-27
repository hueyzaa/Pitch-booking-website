export interface DatSanEntity {
  id: number;
  ma_dat_san: string;
  id_nguoi_dung: number;
  ten_khach_hang: string;
  so_dien_thoai_khach_hang: string;
  id_san: number;
  ten_san: string;
  id_doi_tuong: number | null;
  ten_doi_tuong: string | null;
  phan_tram_giam_gia: number;
  ngay_dat: string;
  gio_bat_dau: string;
  gio_ket_thuc: string;
  tong_tien: number;
  trang_thai: number;
  ghi_chu: string | null;
  nguoi_tao: number;
  ten_nguoi_tao: string;
  ngay_tao: string;
  nguoi_cap_nhat: number | null;
  ten_nguoi_cap_nhat: string | null;
  ngay_cap_nhat: string;
}

export interface DatSanFormValues {
  ma_dat_san?: string;
  id_nguoi_dung: number;
  id_san: number;
  id_doi_tuong?: number | null;
  phan_tram_giam_gia?: number;
  ngay_dat: any; // moment object
  gio_bat_dau: any; // moment object
  gio_ket_thuc: any; // moment object
  tong_tien: number;
  trang_thai: number;
  ghi_chu?: string | null;
}
