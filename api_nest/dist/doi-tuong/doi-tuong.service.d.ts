import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { DataSource, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { DoiTuong } from '../database/entities/doi-tuong.entity';
import { CreateDoiTuongDto, UpdateDoiTuongDto } from './dto/doi-tuong.dto';
export declare class DoiTuongService {
    private readonly databaseService;
    private doiTuongRepo;
    private cacheManager;
    private readonly dataSource;
    private readonly logger;
    constructor(databaseService: DatabaseService, doiTuongRepo: Repository<DoiTuong>, cacheManager: Cache, dataSource: DataSource);
    create(createDoiTuongDto: CreateDoiTuongDto): Promise<CreateDoiTuongDto & DoiTuong>;
    findAllWithPagination(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    findAll(options?: FindManyOptions<DoiTuong>): Promise<DoiTuong[]>;
    findOneById(id: number): Promise<DoiTuong>;
    findOneBy(where: FindOptionsWhere<DoiTuong> | FindOptionsWhere<DoiTuong>[]): Promise<DoiTuong>;
    update(id: number, updateDoiTuongDto: UpdateDoiTuongDto): Promise<DoiTuong>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    removeBy(where: FindOptionsWhere<DoiTuong>): Promise<import("typeorm").UpdateResult>;
    deleteBy(where: FindOptionsWhere<DoiTuong>): Promise<import("typeorm").DeleteResult>;
    findForSelectOptions(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
}
