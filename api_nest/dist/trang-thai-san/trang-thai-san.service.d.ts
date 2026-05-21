import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { DataSource, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { TrangThaiSan } from '../database/entities/trang-thai-san.entity';
import { CreateTrangThaiSanDto, UpdateTrangThaiSanDto } from './dto/trang-thai-san.dto';
export declare class TrangThaiSanService {
    private readonly databaseService;
    private trangThaiSanRepo;
    private cacheManager;
    private readonly dataSource;
    private readonly logger;
    constructor(databaseService: DatabaseService, trangThaiSanRepo: Repository<TrangThaiSan>, cacheManager: Cache, dataSource: DataSource);
    create(createTrangThaiSanDto: CreateTrangThaiSanDto): Promise<CreateTrangThaiSanDto & TrangThaiSan>;
    findAllWithPagination(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    findAll(options?: FindManyOptions<TrangThaiSan>): Promise<TrangThaiSan[]>;
    findOneById(id: number): Promise<TrangThaiSan>;
    findOneBy(where: FindOptionsWhere<TrangThaiSan> | FindOptionsWhere<TrangThaiSan>[]): Promise<TrangThaiSan>;
    update(id: number, updateTrangThaiSanDto: UpdateTrangThaiSanDto): Promise<TrangThaiSan>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    removeBy(where: FindOptionsWhere<TrangThaiSan>): Promise<import("typeorm").UpdateResult>;
    deleteBy(where: FindOptionsWhere<TrangThaiSan>): Promise<import("typeorm").DeleteResult>;
    findForSelectOptions(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
}
