import { NguoiDung } from './nguoi-dung.entity';
import { NguoiDungVaiTro } from './nguoi-dung-vai-tro.entity';
export declare class VaiTro {
    id: number;
    ma_vai_tro: string;
    ten_vai_tro: string;
    nguoi_tao: number;
    ngay_tao: Date;
    nguoi_cap_nhat: number | null;
    ngay_cap_nhat: Date;
    trang_thai: number;
    phan_quyen: string;
    nguoi_dungs: NguoiDung[];
    nguoi_dung_vai_tros: NguoiDungVaiTro[];
}
