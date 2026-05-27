export declare class CreateDanhGiaDto {
    id_nguoi_dung: number;
    id_san: number;
    so_sao: number;
    noi_dung?: string;
    trang_thai?: number;
    nguoi_tao?: number;
    nguoi_cap_nhat?: number;
}
export declare class UpdateDanhGiaDto {
    id_nguoi_dung?: number;
    id_san?: number;
    so_sao?: number;
    noi_dung?: string;
    trang_thai?: number;
    nguoi_cap_nhat?: number;
}
export declare class PublicCreateDanhGiaDto {
    tai_khoan: string;
    id_san: number;
    so_sao: number;
    noi_dung?: string;
}
