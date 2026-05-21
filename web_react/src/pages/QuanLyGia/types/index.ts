export interface QuanLyGiaEntity {
  id: number;
  id_san: number;
  ten_san: string;
  id_doi_tuong?: number;
  ten_doi_tuong?: string;
  phan_tram_giam_gia?: number;
  gia_theo_gio: number;
  don_gia: number;
  ngay_bat_dau: string | null;
  ngay_ket_thuc: string | null;
  trang_thai: number;
  ghi_chu: string | null;
  ngay_tao: string;
  ten_nguoi_tao: string;
  ngay_cap_nhat: string;
  ten_nguoi_cap_nhat: string;
}

export interface QuanLyGiaFormValues {
  id_san: number;
  id_doi_tuong?: number;
  gia_theo_gio: number;
  don_gia?: number;
  ngay_bat_dau?: string;
  ngay_ket_thuc?: string;
  trang_thai?: number;
  ghi_chu?: string;
}
