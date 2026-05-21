import { San } from './san.entity';
import { DatSan } from './dat-san.entity';
export declare class TrangThaiSan {
    id: number;
    id_san: number;
    id_dat_san: number | null;
    ngay: string;
    gio_bat_dau: string;
    gio_ket_thuc: string;
    trang_thai: number;
    ghi_chu: string | null;
    nguoi_tao: number;
    ngay_tao: Date;
    nguoi_cap_nhat: number | null;
    ngay_cap_nhat: Date;
    san: San;
    dat_san: DatSan | null;
}
