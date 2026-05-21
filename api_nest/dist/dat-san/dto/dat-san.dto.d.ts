export declare class CreateDatSanDto {
    ma_dat_san?: string;
    id_khach_hang: number;
    id_san: number;
    ngay_dat: string;
    gio_bat_dau: string;
    gio_ket_thuc: string;
    tong_tien: number;
    id_doi_tuong?: number;
    phan_tram_giam_gia?: number;
    trang_thai: number;
    ghi_chu?: string;
    nguoi_tao?: number;
    nguoi_cap_nhat?: number;
}
export declare class UpdateDatSanDto {
    id_khach_hang?: number;
    id_san?: number;
    ngay_dat?: string;
    gio_bat_dau?: string;
    gio_ket_thuc?: string;
    tong_tien?: number;
    id_doi_tuong?: number;
    phan_tram_giam_gia?: number;
    trang_thai?: number;
    ghi_chu?: string;
    ma_dat_san?: string;
    nguoi_cap_nhat?: number;
}
