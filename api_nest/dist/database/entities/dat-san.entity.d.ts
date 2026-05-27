import { NguoiDung } from './auth/nguoi-dung.entity';
import { San } from './san.entity';
import { DoiTuong } from './doi-tuong.entity';
export declare class DatSan {
    id: number;
    ma_dat_san: string;
    id_nguoi_dung: number;
    id_san: number;
    id_doi_tuong: number | null;
    phan_tram_giam_gia: number;
    ngay_dat: string;
    gio_bat_dau: string;
    gio_ket_thuc: string;
    tong_tien: number;
    trang_thai: number;
    ghi_chu: string | null;
    nguoi_tao: number;
    ngay_tao: Date;
    nguoi_cap_nhat: number | null;
    ngay_cap_nhat: Date;
    nguoi_dung: NguoiDung;
    san: San;
    doi_tuong: DoiTuong | null;
}
