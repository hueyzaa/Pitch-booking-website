import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { DataSource, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { DanhGia } from '../database/entities/danh-gia.entity';
import { KhachHang } from '../database/entities/khach-hang.entity';
import { CreateDanhGiaDto, PublicCreateDanhGiaDto, UpdateDanhGiaDto } from './dto/danh-gia.dto';
export declare class DanhGiaService {
    private readonly databaseService;
    private danhGiaRepo;
    private khachHangRepo;
    private cacheManager;
    private readonly dataSource;
    private readonly logger;
    constructor(databaseService: DatabaseService, danhGiaRepo: Repository<DanhGia>, khachHangRepo: Repository<KhachHang>, cacheManager: Cache, dataSource: DataSource);
    create(createDanhGiaDto: CreateDanhGiaDto): Promise<CreateDanhGiaDto & DanhGia>;
    findAllWithPagination(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    findAll(options?: FindManyOptions<DanhGia>): Promise<DanhGia[]>;
    findOneById(id: number): Promise<DanhGia>;
    findOneBy(where: FindOptionsWhere<DanhGia> | FindOptionsWhere<DanhGia>[]): Promise<DanhGia>;
    update(id: number, updateDanhGiaDto: UpdateDanhGiaDto): Promise<DanhGia>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    removeBy(where: FindOptionsWhere<DanhGia>): Promise<import("typeorm").UpdateResult>;
    deleteBy(where: FindOptionsWhere<DanhGia>): Promise<import("typeorm").DeleteResult>;
    findForSelectOptions(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    findBySanId(idSan: number, page?: number, limit?: number): Promise<{
        collection: any[];
        total: number;
        page: number;
        limit: number;
    }>;
    getSummaryBySanId(idSan: number): Promise<{
        avg_rating: number;
        total_reviews: number;
    }>;
    publicCreate(dto: PublicCreateDanhGiaDto): Promise<DanhGia>;
}
