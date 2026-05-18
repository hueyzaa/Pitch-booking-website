import { Xa } from './xa.entity';
import { NguoiDung } from '../auth/nguoi-dung.entity';
export declare class Tinh {
    id: number;
    code: string;
    name: string;
    full_name: string;
    slug: string;
    type: string;
    is_central: string;
    xas: Xa[];
    nguoi_dungs: NguoiDung[];
}
