import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { DataSource, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { QuanLyGia } from '../database/entities/quan-ly-gia.entity';
import { DoiTuong } from '../database/entities/doi-tuong.entity';
import { CreateQuanLyGiaDto, UpdateQuanLyGiaDto } from './dto/quan-ly-gia.dto';
export declare class QuanLyGiaService {
    private readonly databaseService;
    private quanLyGiaRepo;
    private doiTuongRepo;
    private cacheManager;
    private readonly dataSource;
    private readonly logger;
    constructor(databaseService: DatabaseService, quanLyGiaRepo: Repository<QuanLyGia>, doiTuongRepo: Repository<DoiTuong>, cacheManager: Cache, dataSource: DataSource);
    create(createQuanLyGiaDto: CreateQuanLyGiaDto): Promise<{
        don_gia: number;
        id_san: number;
        id_bang_gia?: number;
        id_doi_tuong?: number;
        gia_theo_gio: number;
        ngay_bat_dau?: string;
        ngay_ket_thuc?: string;
        trang_thai?: number;
        ghi_chu?: string;
        nguoi_tao?: number;
        nguoi_cap_nhat?: number;
    } & QuanLyGia>;
    findAllWithPagination(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    findAll(options?: FindManyOptions<QuanLyGia>): Promise<QuanLyGia[]>;
    findOneById(id: number): Promise<QuanLyGia>;
    findOneBy(where: FindOptionsWhere<QuanLyGia> | FindOptionsWhere<QuanLyGia>[]): Promise<QuanLyGia>;
    update(id: number, updateQuanLyGiaDto: UpdateQuanLyGiaDto): Promise<QuanLyGia>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    removeBy(where: FindOptionsWhere<QuanLyGia>): Promise<import("typeorm").UpdateResult>;
    deleteBy(where: FindOptionsWhere<QuanLyGia>): Promise<import("typeorm").DeleteResult>;
    findForSelectOptions(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    findPriceBySan(id_san: number): Promise<QuanLyGia>;
}
