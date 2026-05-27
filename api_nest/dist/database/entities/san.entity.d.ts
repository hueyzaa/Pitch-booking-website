import { LoaiSan } from './loai-san.entity';
import { Tinh } from './common/tinh.entity';
import { Xa } from './common/xa.entity';
export declare class San {
    id: number;
    ten_san: string;
    id_loai_san: number;
    nguoi_tao: number;
    ngay_tao: Date;
    nguoi_cap_nhat: number | null;
    ngay_cap_nhat: Date;
    dia_chi: string | null;
    tinh_id: number | null;
    xa_id: number | null;
    tien_ich: string[] | null;
    anh_chinh: string | null;
    anh_chi_tiet: string[] | null;
    mo_ta: string | null;
    loai_san: LoaiSan;
    tinh: Tinh;
    xa: Xa;
}
