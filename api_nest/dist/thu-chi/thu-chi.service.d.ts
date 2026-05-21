import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { DataSource, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { ThuChi } from '../database/entities/thu-chi.entity';
import { CreateThuChiDto, UpdateThuChiDto } from './dto/thu-chi.dto';
export declare class ThuChiService {
    private readonly databaseService;
    private thuChiRepo;
    private cacheManager;
    private readonly dataSource;
    private readonly logger;
    constructor(databaseService: DatabaseService, thuChiRepo: Repository<ThuChi>, cacheManager: Cache, dataSource: DataSource);
    create(createThuChiDto: CreateThuChiDto): Promise<CreateThuChiDto & ThuChi>;
    findAllWithPagination(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    findAll(options?: FindManyOptions<ThuChi>): Promise<ThuChi[]>;
    findOneById(id: number): Promise<ThuChi>;
    findOneBy(where: FindOptionsWhere<ThuChi> | FindOptionsWhere<ThuChi>[]): Promise<ThuChi>;
    update(id: number, updateThuChiDto: UpdateThuChiDto): Promise<ThuChi>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    removeBy(where: FindOptionsWhere<ThuChi>): Promise<import("typeorm").UpdateResult>;
    deleteBy(where: FindOptionsWhere<ThuChi>): Promise<import("typeorm").DeleteResult>;
    findForSelectOptions(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
}
