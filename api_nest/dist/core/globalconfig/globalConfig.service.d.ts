import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { CauHinhChung } from '@database/entities/system/cau-hinh-chung.entity';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
export declare class GlobalConfigService {
    private readonly cauHinhChungRepo;
    private cacheManager;
    private readonly logger;
    constructor(cauHinhChungRepo: Repository<CauHinhChung>, cacheManager: Cache);
    getConfigByKey(key: string): Promise<CauHinhChung>;
    getConfigByKeyCache(key: string): Promise<string>;
    getConfigsByKeysCache(keys: Array<{
        key: string;
        defaultValue: string;
    }>): Promise<Record<string, string>>;
    writeConfigToKey(key: string, value: string): Promise<import("typeorm").InsertResult>;
    updateConfigKey(key: string, value: string, user: UserReqData): Promise<import("typeorm").UpdateResult>;
}
