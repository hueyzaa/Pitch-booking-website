import { NguoiDung } from './nguoi-dung.entity';
export declare class NguoiDungThietBi {
    id: number;
    nguoi_dung_id: number;
    nguoi_tao: number;
    ngay_tao: Date;
    nguoi_cap_nhat: number | null;
    ngay_cap_nhat: Date;
    access_token: string | null;
    refresh_token: string | null;
    firebase_token: string | null;
    device_id: string;
    nguoi_dung: NguoiDung;
}
