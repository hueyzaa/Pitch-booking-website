import { HelperService } from '@helper/helper.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { CreateDanhGiaDto, PublicCreateDanhGiaDto, UpdateDanhGiaDto } from './dto/danh-gia.dto';
import { DanhGiaService } from './danh-gia.service';
export declare class DanhGiaController {
    private readonly danhGiaService;
    private readonly helperService;
    private readonly logger;
    constructor(danhGiaService: DanhGiaService, helperService: HelperService);
    getLatestPublicReviews(limit?: string): Promise<any[]>;
    getSummaryBySan(idSan: string): Promise<{
        avg_rating: number;
        total_reviews: number;
    }>;
    getReviewsBySan(idSan: string, page?: string, limit?: string): Promise<{
        collection: any[];
        total: number;
        page: number;
        limit: number;
    }>;
    publicCreate(dto: PublicCreateDanhGiaDto): Promise<import("../database/entities/danh-gia.entity").DanhGia>;
    create(createDanhGiaDto: CreateDanhGiaDto, user: UserReqData): Promise<CreateDanhGiaDto & import("../database/entities/danh-gia.entity").DanhGia>;
    exportExcel(filters: FilterData, res: any): Promise<any>;
    findAllForSelectOptions(filters: any): Promise<import("../database/database.service").PaginationResult<any>>;
    findAll(filters: FilterData): Promise<import("../database/database.service").PaginationResult<any>>;
    findOne(id: string): Promise<import("../database/entities/danh-gia.entity").DanhGia>;
    update(id: string, updateDanhGiaDto: UpdateDanhGiaDto, user: UserReqData): Promise<import("../database/entities/danh-gia.entity").DanhGia>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
