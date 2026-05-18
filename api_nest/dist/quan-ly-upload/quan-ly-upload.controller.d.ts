import { HelperService } from '@helper/helper.service';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { QuanLyUploadService } from './quan-ly-upload.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
export declare class QuanLyUploadController {
    private readonly quanLyUploadService;
    private readonly helperService;
    private readonly logger;
    constructor(quanLyUploadService: QuanLyUploadService, helperService: HelperService);
    findAllForSelectOptions(filters: any): Promise<import("../database/database.service").PaginationResult<any>>;
    findAll(filters: FilterData, user: UserReqData): Promise<{
        collection: any[];
        total: number;
        total_current: number;
        from: number;
        to: number;
        current_page: number;
        next_page: number;
        last_page: number;
    }>;
    findOne(id: string, user: UserReqData): Promise<import("../database/entities/system/quan-ly-upload.entity").QuanLyUpload>;
    grantViewPermission(id: string, body: {
        user_ids: number[];
    }, user: UserReqData): Promise<{
        success: boolean;
    }>;
    remove(id: string): Promise<import("../database/entities/system/quan-ly-upload.entity").QuanLyUpload>;
}
