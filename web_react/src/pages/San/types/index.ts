export interface SanEntity {
  id: number;
  ten_san: string;
  id_loai_san: number;
  ten_loai_san: string;
  dia_chi?: string;
  tinh_id?: number;
  xa_id?: number;
  ten_tinh?: string;
  ten_xa?: string;
  tien_ich?: string[] | string;
  mo_ta?: string;
  anh_chinh?: string;
  anh_chi_tiet?: string[] | string;
  ngay_tao?: string;
  ten_nguoi_tao?: string;
  ngay_cap_nhat?: string;
  ten_nguoi_cap_nhat?: string;
}

export interface SanFormValues {
  ten_san: string;
  id_loai_san: number;
  dia_chi?: string;
  tinh_id?: number;
  xa_id?: number;
  tien_ich?: string[];
  mo_ta?: string;
  anh_chinh?: any;
  anh_chi_tiet?: any[];
}
