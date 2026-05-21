import { HelperService } from '@helper/helper.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { CreateThuChiDto, UpdateThuChiDto } from './dto/thu-chi.dto';
import { ThuChiService } from './thu-chi.service';
export declare class ThuChiController {
    private readonly thuChiService;
    private readonly helperService;
    private readonly logger;
    constructor(thuChiService: ThuChiService, helperService: HelperService);
    create(createThuChiDto: CreateThuChiDto, user: UserReqData): Promise<CreateThuChiDto & import("../database/entities/thu-chi.entity").ThuChi>;
    exportExcel(filters: FilterData, res: any): Promise<any>;
    findAllForSelectOptions(filters: any): Promise<import("../database/database.service").PaginationResult<any>>;
    findAll(filters: FilterData): Promise<import("../database/database.service").PaginationResult<any>>;
    findOne(id: string): Promise<import("../database/entities/thu-chi.entity").ThuChi>;
    update(id: string, updateThuChiDto: UpdateThuChiDto, user: UserReqData): Promise<import("../database/entities/thu-chi.entity").ThuChi>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
