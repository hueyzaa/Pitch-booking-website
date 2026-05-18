import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { DataSource, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateCauHinhChungDto, UpdateCauHinhChungDto } from './dto/cau-hinh-chung.dto';
import { GlobalConfigService } from '@core/globalconfig/globalConfig.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { CauHinhChung } from '@database/entities/system/cau-hinh-chung.entity';
export declare class CauHinhChungService {
    private readonly databaseService;
    private cauHinhChungRepo;
    private readonly globalConfigService;
    private cacheManager;
    private readonly dataSource;
    private readonly logger;
    constructor(databaseService: DatabaseService, cauHinhChungRepo: Repository<CauHinhChung>, globalConfigService: GlobalConfigService, cacheManager: Cache, dataSource: DataSource);
    create(createCauHinhChungDto: CreateCauHinhChungDto): Promise<CreateCauHinhChungDto & CauHinhChung>;
    findAllWithPagination(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    findAll(options?: FindManyOptions<CauHinhChung>): Promise<CauHinhChung[]>;
    findOneById(id: number): Promise<CauHinhChung>;
    findOneBy(where: FindOptionsWhere<CauHinhChung> | FindOptionsWhere<CauHinhChung>[]): Promise<CauHinhChung>;
    update(updateCauHinhChungDto: UpdateCauHinhChungDto, user: UserReqData): Promise<CauHinhChung>;
    updateConfigs(updateConfigsDto: {
        key: string;
        value: string;
    }[], user: UserReqData): Promise<any[]>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    removeBy(where: FindOptionsWhere<CauHinhChung>): Promise<import("typeorm").UpdateResult>;
    deleteBy(where: FindOptionsWhere<CauHinhChung>): Promise<import("typeorm").DeleteResult>;
    findForSelectOptions(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    findSpecificConfigs(): Promise<CauHinhChung[]>;
}
