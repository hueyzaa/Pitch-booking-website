import { NguoiDungThietBi } from '@database/entities/auth/nguoi-dung-thiet-bi.entity';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/session.dto';
export declare class SessionService {
    private readonly nguoiDungThietBiRepo;
    private readonly logger;
    constructor(nguoiDungThietBiRepo: Repository<NguoiDungThietBi>);
    insertSession(createSessionDto: CreateSessionDto): Promise<void>;
    checkTokenInDB(nguoi_dung_id: number, access_token: string): Promise<boolean>;
    findOneByNguoiDungId(nguoi_dung_id: number): Promise<NguoiDungThietBi>;
    removeSession(nguoi_dung_id: number, device_id: string): Promise<import("typeorm").DeleteResult>;
    clearAllSession(): Promise<void>;
    clearSessionByNguoiDungId(nguoi_dung_id: number): Promise<import("typeorm").DeleteResult>;
    updateFirebaseToken(nguoi_dung_id: number, firebase_token: string): Promise<void>;
}
