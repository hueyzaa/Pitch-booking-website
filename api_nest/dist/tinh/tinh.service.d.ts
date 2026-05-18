import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { Repository } from 'typeorm';
import { Tinh } from '../database/entities/common/tinh.entity';
export declare class TinhService {
    private readonly databaseService;
    private tinhRepo;
    private cacheManager;
    constructor(databaseService: DatabaseService, tinhRepo: Repository<Tinh>, cacheManager: Cache);
    findForSelectOptions(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
}
