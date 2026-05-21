export interface DoiTuongEntity {
  id: number;
  ten_doi_tuong: string;
  phan_tram_giam_gia: number;
  ngay_tao: string;
  ten_nguoi_tao: string;
  ngay_cap_nhat: string;
  ten_nguoi_cap_nhat: string;
}

export interface DoiTuongFormValues {
  ten_doi_tuong: string;
  phan_tram_giam_gia: number;
}
