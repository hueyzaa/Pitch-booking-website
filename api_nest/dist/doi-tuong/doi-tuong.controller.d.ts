import { HelperService } from '@helper/helper.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { CreateDoiTuongDto, UpdateDoiTuongDto } from './dto/doi-tuong.dto';
import { DoiTuongService } from './doi-tuong.service';
export declare class DoiTuongController {
    private readonly doiTuongService;
    private readonly helperService;
    private readonly logger;
    constructor(doiTuongService: DoiTuongService, helperService: HelperService);
    create(createDoiTuongDto: CreateDoiTuongDto, user: UserReqData): Promise<CreateDoiTuongDto & import("../database/entities/doi-tuong.entity").DoiTuong>;
    exportExcel(filters: FilterData, res: any): Promise<any>;
    findAllForSelectOptions(filters: any): Promise<import("../database/database.service").PaginationResult<any>>;
    findAll(filters: FilterData): Promise<import("../database/database.service").PaginationResult<any>>;
    findOne(id: string): Promise<import("../database/entities/doi-tuong.entity").DoiTuong>;
    update(id: string, updateDoiTuongDto: UpdateDoiTuongDto, user: UserReqData): Promise<import("../database/entities/doi-tuong.entity").DoiTuong>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
