import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { DataSource, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { BangGia } from '../database/entities/bang-gia.entity';
import { CreateBangGiaDto, UpdateBangGiaDto } from './dto/bang-gia.dto';
export declare class BangGiaService {
    private readonly databaseService;
    private bangGiaRepo;
    private cacheManager;
    private readonly dataSource;
    private readonly logger;
    constructor(databaseService: DatabaseService, bangGiaRepo: Repository<BangGia>, cacheManager: Cache, dataSource: DataSource);
    create(createBangGiaDto: CreateBangGiaDto): Promise<CreateBangGiaDto & BangGia>;
    findAllWithPagination(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    findAll(options?: FindManyOptions<BangGia>): Promise<BangGia[]>;
    findOneById(id: number): Promise<BangGia>;
    findOneBy(where: FindOptionsWhere<BangGia> | FindOptionsWhere<BangGia>[]): Promise<BangGia>;
    update(id: number, updateBangGiaDto: UpdateBangGiaDto): Promise<BangGia>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    removeBy(where: FindOptionsWhere<BangGia>): Promise<import("typeorm").UpdateResult>;
    deleteBy(where: FindOptionsWhere<BangGia>): Promise<import("typeorm").DeleteResult>;
    findForSelectOptions(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
}
