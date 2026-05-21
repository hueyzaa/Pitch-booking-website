import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { DataSource, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { San } from '../database/entities/san.entity';
import { CreateSanDto, UpdateSanDto } from './dto/san.dto';
export declare class SanService {
    private readonly databaseService;
    private sanRepo;
    private cacheManager;
    private readonly dataSource;
    private readonly logger;
    constructor(databaseService: DatabaseService, sanRepo: Repository<San>, cacheManager: Cache, dataSource: DataSource);
    create(createSanDto: CreateSanDto): Promise<CreateSanDto & San>;
    findAllWithPagination(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    findAll(options?: FindManyOptions<San>): Promise<San[]>;
    findOneById(id: number): Promise<San>;
    findOneBy(where: FindOptionsWhere<San> | FindOptionsWhere<San>[]): Promise<San>;
    update(id: number, updateSanDto: UpdateSanDto): Promise<San>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    removeBy(where: FindOptionsWhere<San>): Promise<import("typeorm").UpdateResult>;
    deleteBy(where: FindOptionsWhere<San>): Promise<import("typeorm").DeleteResult>;
    findForSelectOptions(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
}
