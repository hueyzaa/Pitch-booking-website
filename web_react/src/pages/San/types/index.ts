export interface SanEntity {
  id: number;
  ten_san: string;
  id_loai_san: number;
  ten_loai_san: string;
  ngay_tao?: string;
  ten_nguoi_tao?: string;
  ngay_cap_nhat?: string;
  ten_nguoi_cap_nhat?: string;
}

export interface SanFormValues {
  ten_san: string;
  id_loai_san: number;
}
