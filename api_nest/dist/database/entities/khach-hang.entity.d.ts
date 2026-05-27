import { DoiTuong } from './doi-tuong.entity';
export declare class KhachHang {
    id: number;
    ho_va_ten: string;
    so_dien_thoai: string;
    email: string | null;
    dia_chi: string | null;
    ngay_sinh: Date | null;
    gioi_tinh: number | null;
    id_doi_tuong: number;
    ho: string | null;
    ten: string | null;
    tai_khoan: string | null;
    mat_khau: string | null;
    tinh_id: number | null;
    xa_id: number | null;
    nguoi_tao: number;
    ngay_tao: Date;
    nguoi_cap_nhat: number | null;
    ngay_cap_nhat: Date;
    doi_tuong: DoiTuong;
}
