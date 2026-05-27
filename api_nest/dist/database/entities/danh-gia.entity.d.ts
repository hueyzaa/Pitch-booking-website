import { KhachHang } from './khach-hang.entity';
import { San } from './san.entity';
export declare class DanhGia {
    id: number;
    id_khach_hang: number;
    id_san: number;
    so_sao: number;
    noi_dung: string | null;
    trang_thai: number;
    nguoi_tao: number | null;
    ngay_tao: Date;
    nguoi_cap_nhat: number | null;
    ngay_cap_nhat: Date;
    khach_hang: KhachHang;
    san: San;
}
