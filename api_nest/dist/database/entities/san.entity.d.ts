import { LoaiSan } from './loai-san.entity';
export declare class San {
    id: number;
    ten_san: string;
    id_loai_san: number;
    nguoi_tao: number;
    ngay_tao: Date;
    nguoi_cap_nhat: number | null;
    ngay_cap_nhat: Date;
    loai_san: LoaiSan;
}
