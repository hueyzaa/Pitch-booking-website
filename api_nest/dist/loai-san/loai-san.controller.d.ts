import { HelperService } from '@helper/helper.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { CreateLoaiSanDto, UpdateLoaiSanDto } from './dto/loai-san.dto';
import { LoaiSanService } from './loai-san.service';
export declare class LoaiSanController {
    private readonly loaiSanService;
    private readonly helperService;
    private readonly logger;
    constructor(loaiSanService: LoaiSanService, helperService: HelperService);
    create(createLoaiSanDto: CreateLoaiSanDto, user: UserReqData): Promise<CreateLoaiSanDto & import("../database/entities/loai-san.entity").LoaiSan>;
    exportExcel(filters: FilterData, res: any): Promise<any>;
    findAllForSelectOptions(filters: any): Promise<import("../database/database.service").PaginationResult<any>>;
    findAll(filters: FilterData): Promise<import("../database/database.service").PaginationResult<any>>;
    findOne(id: string): Promise<import("../database/entities/loai-san.entity").LoaiSan>;
    update(id: string, updateLoaiSanDto: UpdateLoaiSanDto, user: UserReqData): Promise<import("../database/entities/loai-san.entity").LoaiSan>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
