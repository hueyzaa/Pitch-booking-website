import { HelperService } from '@helper/helper.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { CreateTrangThaiSanDto, UpdateTrangThaiSanDto } from './dto/trang-thai-san.dto';
import { TrangThaiSanService } from './trang-thai-san.service';
export declare class TrangThaiSanController {
    private readonly trangThaiSanService;
    private readonly helperService;
    private readonly logger;
    constructor(trangThaiSanService: TrangThaiSanService, helperService: HelperService);
    create(createTrangThaiSanDto: CreateTrangThaiSanDto, user: UserReqData): Promise<CreateTrangThaiSanDto & import("../database/entities/trang-thai-san.entity").TrangThaiSan>;
    exportExcel(filters: FilterData, res: any): Promise<any>;
    findAllForSelectOptions(filters: any): Promise<import("../database/database.service").PaginationResult<any>>;
    findAll(filters: FilterData): Promise<import("../database/database.service").PaginationResult<any>>;
    findOne(id: string): Promise<import("../database/entities/trang-thai-san.entity").TrangThaiSan>;
    update(id: string, updateTrangThaiSanDto: UpdateTrangThaiSanDto, user: UserReqData): Promise<import("../database/entities/trang-thai-san.entity").TrangThaiSan>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
