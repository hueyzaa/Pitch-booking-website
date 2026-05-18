import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { ThongBao } from '../database/entities/system/thong-bao.entity';
import { CreateThongBaoDto, UpdateThongBaoDto } from './dto/thong-bao.dto';
export declare class ThongBaoService {
    private readonly databaseService;
    private thongBaoRepo;
    private cacheManager;
    constructor(databaseService: DatabaseService, thongBaoRepo: Repository<ThongBao>, cacheManager: Cache);
    create(createThongBaoDto: CreateThongBaoDto): Promise<CreateThongBaoDto & ThongBao>;
    findAllWithPagination(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    findAll(options?: FindManyOptions<ThongBao>): Promise<ThongBao[]>;
    findOneById(id: number): Promise<ThongBao>;
    findOneBy(where: FindOptionsWhere<ThongBao> | FindOptionsWhere<ThongBao>[]): Promise<ThongBao>;
    update(id: number, updateThongBaoDto: UpdateThongBaoDto): Promise<ThongBao>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    removeBy(where: FindOptionsWhere<ThongBao>): Promise<import("typeorm").UpdateResult>;
    deleteBy(where: FindOptionsWhere<ThongBao>): Promise<import("typeorm").DeleteResult>;
    bulkDelete(ids: number[]): Promise<import("typeorm").DeleteResult>;
    markAllRead(userId: number): Promise<import("typeorm").UpdateResult>;
    deleteAllByUserId(userId: number): Promise<import("typeorm").DeleteResult>;
    findForSelectOptions(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
}
