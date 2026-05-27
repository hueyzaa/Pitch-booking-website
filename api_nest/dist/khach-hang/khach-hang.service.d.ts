import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { DataSource, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { KhachHang } from '../database/entities/khach-hang.entity';
import { CreateKhachHangDto, UpdateKhachHangDto } from './dto/khach-hang.dto';
import { HelperService } from 'src/helper/helper.service';
export declare class KhachHangService {
    private readonly databaseService;
    private readonly helperService;
    private khachHangRepo;
    private cacheManager;
    private readonly dataSource;
    private readonly logger;
    constructor(databaseService: DatabaseService, helperService: HelperService, khachHangRepo: Repository<KhachHang>, cacheManager: Cache, dataSource: DataSource);
    create(createKhachHangDto: CreateKhachHangDto): Promise<CreateKhachHangDto & KhachHang>;
    findAllWithPagination(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    findAll(options?: FindManyOptions<KhachHang>): Promise<KhachHang[]>;
    findOneById(id: number): Promise<KhachHang>;
    findOneBy(where: FindOptionsWhere<KhachHang> | FindOptionsWhere<KhachHang>[]): Promise<KhachHang>;
    update(id: number, updateKhachHangDto: UpdateKhachHangDto): Promise<KhachHang>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    removeBy(where: FindOptionsWhere<KhachHang>): Promise<import("typeorm").UpdateResult>;
    deleteBy(where: FindOptionsWhere<KhachHang>): Promise<import("typeorm").DeleteResult>;
    findForSelectOptions(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
}
