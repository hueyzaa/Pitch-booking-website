export interface CongNgheEntity {
  id: number;
  ten: string;
  mo_ta?: string;
  mau?: string;
  trang_thai: number;
  ngay_tao?: string;
  ngay_cap_nhat?: string;
}

export interface CongNgheFormValues {
  ten: string;
  mo_ta?: string;
  mau?: string;
  trang_thai: boolean;
}
