import { QuanLyUploadPermission } from '@database/entities/system/quan-ly-upload-permission.entity';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { QuanLyUpload } from '../database/entities/system/quan-ly-upload.entity';
import { CreateQuanLyUploadDto, UpdateQuanLyUploadDto } from './dto/quan-ly-upload.dto';
import { HelperService } from '@helper/helper.service';
export declare class QuanLyUploadService {
    private readonly databaseService;
    private quanLyUploadRepo;
    private readonly helperService;
    private permissionRepo;
    private readonly logger;
    constructor(databaseService: DatabaseService, quanLyUploadRepo: Repository<QuanLyUpload>, helperService: HelperService, permissionRepo: Repository<QuanLyUploadPermission>);
    create(createQuanLyUploadDto: CreateQuanLyUploadDto): Promise<CreateQuanLyUploadDto & QuanLyUpload>;
    findAllWithPagination(filters: FilterData, userId: number): Promise<{
        collection: any[];
        total: number;
        total_current: number;
        from: number;
        to: number;
        current_page: number;
        next_page: number;
        last_page: number;
    }>;
    findAll(options?: FindManyOptions<QuanLyUpload>): Promise<QuanLyUpload[]>;
    findOneByIdWithPermission(id: number, userId: number): Promise<QuanLyUpload>;
    findOneById(id: number): Promise<QuanLyUpload>;
    findOneBy(where: FindOptionsWhere<QuanLyUpload> | FindOptionsWhere<QuanLyUpload>[]): Promise<QuanLyUpload>;
    update(id: number, updateQuanLyUploadDto: UpdateQuanLyUploadDto): Promise<QuanLyUpload>;
    remove(id: number): Promise<QuanLyUpload>;
    removeBy(where: FindOptionsWhere<QuanLyUpload>): Promise<import("typeorm").UpdateResult>;
    deleteBy(where: FindOptionsWhere<QuanLyUpload>): Promise<QuanLyUpload>;
    findForSelectOptions(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    moveToOldFolder(relativeFilePath: string): Promise<void>;
    grantViewPermission(fileId: number, userIds: number[], currentUserId: number): Promise<void>;
}
