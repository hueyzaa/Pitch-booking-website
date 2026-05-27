export declare class UpdateSelfDto {
    email: string | null;
    ho: string;
    ten: string;
    ngay_sinh: Date;
    gioi_tinh: number;
    dia_chi: string;
    tinh_id: number;
    huyen_id: number;
    xa_id: number;
    so_dien_thoai: string;
    ho_va_ten: string;
    nguoi_cap_nhat: number | null;
    ngay_cap_nhat: Date;
    anh_dai_dien?: string;
    san_yeu_thich?: string;
}
export declare class ChangePasswordDto {
    mat_khau_hien_tai: string;
    is_first_change: number;
    mat_khau_moi: string;
    mat_khau_moi_xac_nhan: string;
}
export declare class UpdatePasswordDto {
    mat_khau_moi: string;
    mat_khau_moi_xac_nhan: string;
}
