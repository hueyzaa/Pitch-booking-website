import { NguoiDung } from '../auth/nguoi-dung.entity';
export declare class ThongBao {
    id: number;
    da_xem: number;
    nguoi_dung_id: number;
    nguoi_tao: number;
    ngay_tao: Date;
    nguoi_cap_nhat: number | null;
    ngay_cap_nhat: Date;
    tieu_de: string;
    noi_dung: string;
    nguoi_dung: NguoiDung;
}
