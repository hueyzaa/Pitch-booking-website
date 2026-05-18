export interface UserReqData {
    id: number;
    ho_va_ten: string;
    tai_khoan: string;
    mat_khau: string;
    email: string;
    trang_thai: number;
    ma_vai_tro: string;
    phan_quyen: string;
    reset_pass_token: string | null;
    device_id: string | null;
    re_capcha_token: string | null;
}
