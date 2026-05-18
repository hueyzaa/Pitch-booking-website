import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { Repository } from 'typeorm';
import { Xa } from '../database/entities/common/xa.entity';
export declare class XaService {
    private readonly databaseService;
    private xaRepo;
    private cacheManager;
    constructor(databaseService: DatabaseService, xaRepo: Repository<Xa>, cacheManager: Cache);
    findForSelectOptions(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
}
