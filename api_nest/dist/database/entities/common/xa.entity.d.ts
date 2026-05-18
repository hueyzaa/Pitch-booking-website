import { NguoiDung } from '../auth/nguoi-dung.entity';
export declare class Xa {
    id: number;
    code: string;
    name: string;
    full_name: string;
    slug: string;
    type: string;
    province_code: string | null;
    nguoi_dungs: NguoiDung[];
}
