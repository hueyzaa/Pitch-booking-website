import { Log } from '@database/entities/system/log.entity';
import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
export declare class LogService {
    private readonly databaseService;
    private logRepo;
    private cacheManager;
    private readonly dataSource;
    private readonly logger;
    constructor(databaseService: DatabaseService, logRepo: Repository<Log>, cacheManager: Cache, dataSource: DataSource);
    findAllWithPagination(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    findAll(options?: FindManyOptions<Log>): Promise<Log[]>;
    findOneById(id: number): Promise<Log>;
}
