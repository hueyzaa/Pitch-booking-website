export interface LoaiSanEntity {
  id: number;
  ten_loai_san: string;
  ngay_tao?: string;
  ten_nguoi_tao?: string;
  ngay_cap_nhat?: string;
  ten_nguoi_cap_nhat?: string;
}

export interface LoaiSanFormValues {
  ten_loai_san: string;
}
