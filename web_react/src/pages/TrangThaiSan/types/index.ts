export interface TrangThaiSanEntity {
  id: number;
  id_san: number;
  ten_san: string | null;
  ngay: string;
  gio_bat_dau: string;
  gio_ket_thuc: string;
  trang_thai: number;
  ghi_chu: string | null;
  ngay_tao: string;
  ten_nguoi_tao: string;
  ngay_cap_nhat: string;
  ten_nguoi_cap_nhat: string;
}

export interface TrangThaiSanFormValues {
  id_san: number;
  ngay: any;
  gio_bat_dau: any;
  gio_ket_thuc: any;
  trang_thai: number;
  ghi_chu?: string;
}
