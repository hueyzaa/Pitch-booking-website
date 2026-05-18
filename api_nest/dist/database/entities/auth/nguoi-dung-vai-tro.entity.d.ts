import { NguoiDung } from './nguoi-dung.entity';
import { VaiTro } from './vai-tro.entity';
export declare class NguoiDungVaiTro {
    id: number;
    nguoi_dung_id: number;
    vai_tro_id: number;
    ghi_chu: string | null;
    nguoi_tao: number | null;
    nguoi_cap_nhat: number | null;
    ngay_tao: Date | null;
    ngay_cap_nhat: Date | null;
    nguoi_dung: NguoiDung;
    vai_tro: VaiTro;
}
