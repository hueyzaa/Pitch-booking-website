import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { DataSource, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { LoaiSan } from '../database/entities/loai-san.entity';
import { CreateLoaiSanDto, UpdateLoaiSanDto } from './dto/loai-san.dto';
export declare class LoaiSanService {
    private readonly databaseService;
    private loaiSanRepo;
    private cacheManager;
    private readonly dataSource;
    private readonly logger;
    constructor(databaseService: DatabaseService, loaiSanRepo: Repository<LoaiSan>, cacheManager: Cache, dataSource: DataSource);
    create(createLoaiSanDto: CreateLoaiSanDto): Promise<CreateLoaiSanDto & LoaiSan>;
    findAllWithPagination(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    findAll(options?: FindManyOptions<LoaiSan>): Promise<LoaiSan[]>;
    findOneById(id: number): Promise<LoaiSan>;
    findOneBy(where: FindOptionsWhere<LoaiSan> | FindOptionsWhere<LoaiSan>[]): Promise<LoaiSan>;
    update(id: number, updateLoaiSanDto: UpdateLoaiSanDto): Promise<LoaiSan>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    removeBy(where: FindOptionsWhere<LoaiSan>): Promise<import("typeorm").UpdateResult>;
    deleteBy(where: FindOptionsWhere<LoaiSan>): Promise<import("typeorm").DeleteResult>;
    findForSelectOptions(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
}
