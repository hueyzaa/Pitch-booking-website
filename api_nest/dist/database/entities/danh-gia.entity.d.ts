import { NguoiDung } from './auth/nguoi-dung.entity';
import { San } from './san.entity';
export declare class DanhGia {
    id: number;
    id_nguoi_dung: number;
    id_san: number;
    so_sao: number;
    noi_dung: string | null;
    trang_thai: number;
    nguoi_tao: number | null;
    ngay_tao: Date;
    nguoi_cap_nhat: number | null;
    ngay_cap_nhat: Date;
    nguoi_dung: NguoiDung;
    san: San;
}
