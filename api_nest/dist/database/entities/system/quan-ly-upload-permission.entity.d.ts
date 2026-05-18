import { QuanLyUpload } from './quan-ly-upload.entity';
import { NguoiDung } from '../auth/nguoi-dung.entity';
export declare class QuanLyUploadPermission {
    id: number;
    file_id: number;
    user_id: number;
    file: QuanLyUpload;
    user: NguoiDung;
}
