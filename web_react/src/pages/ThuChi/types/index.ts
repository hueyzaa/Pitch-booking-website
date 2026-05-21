export interface ThuChiEntity {
  id: number;
  loai_giao_dich: number;
  danh_muc: string;
  so_tien: number;
  ngay_giao_dich: string;
  mo_ta: string | null;
  id_khach_hang: number | null;
  ten_khach_hang: string | null;
  id_san: number | null;
  ten_san: string | null;
  ghi_chu: string | null;
  ngay_tao: string;
  ten_nguoi_tao: string;
  ngay_cap_nhat: string;
  ten_nguoi_cap_nhat: string;
}

export interface ThuChiFormValues {
  loai_giao_dich: number;
  danh_muc: string;
  so_tien: number;
  ngay_giao_dich: any;
  id_khach_hang?: number;
  id_san?: number;
  mo_ta?: string;
  ghi_chu?: string;
}
