import { QuanLyUploadPermission } from './quan-ly-upload-permission.entity';
export declare class QuanLyUpload {
    id: number;
    original_name: string;
    file_path: string;
    mime_type: string;
    loai_file: string;
    destination: string;
    file_name: string;
    path: string;
    size: number;
    file_type: string;
    nguoi_tao: number;
    ngay_tao: Date;
    nguoi_cap_nhat: number;
    ngay_cap_nhat: Date;
    permissions: QuanLyUploadPermission[];
}
