import { HelperService } from '@helper/helper.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { CreateCauHinhChungDto } from './dto/cau-hinh-chung.dto';
import { CauHinhChungService } from './cau-hinh-chung.service';
export declare class CauHinhChungController {
    private readonly cauHinhChungService;
    private readonly helperService;
    private readonly logger;
    constructor(cauHinhChungService: CauHinhChungService, helperService: HelperService);
    create(createCauHinhChungDto: CreateCauHinhChungDto, user: UserReqData): Promise<CreateCauHinhChungDto & import("../database/entities/system/cau-hinh-chung.entity").CauHinhChung>;
    exportExcel(filters: FilterData, res: any): Promise<any>;
    findAllForSelectOptions(filters: any): Promise<import("../database/database.service").PaginationResult<any>>;
    findAll(filters: FilterData): Promise<import("../database/database.service").PaginationResult<any>>;
    findSpecificConfigs(): Promise<import("../database/entities/system/cau-hinh-chung.entity").CauHinhChung[]>;
    findOne(id: string): Promise<import("../database/entities/system/cau-hinh-chung.entity").CauHinhChung>;
    update(updateConfigsDto: {
        key: string;
        value: string;
    }[], user: UserReqData): Promise<{
        message: string;
        result: any[];
    }>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
