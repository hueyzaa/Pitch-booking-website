export interface BangGiaEntity {
  id: number;
  ten_bang_gia: string;
  don_gia: number;
  gio_bat_dau: string | null;
  gio_ket_thuc: string | null;
  id_loai_san: number | null;
  ten_loai_san: string | null;
  id_doi_tuong: number | null;
  ten_doi_tuong: string | null;
  ngay_tao: string;
  ten_nguoi_tao: string;
  ngay_cap_nhat: string;
  ten_nguoi_cap_nhat: string;
}

export interface BangGiaFormValues {
  ten_bang_gia: string;
  don_gia: number;
  gio_bat_dau?: string;
  gio_ket_thuc?: string;
  id_loai_san?: number;
  id_doi_tuong?: number;
}
