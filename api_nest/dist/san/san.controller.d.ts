import { HelperService } from '@helper/helper.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { CreateSanDto, UpdateSanDto } from './dto/san.dto';
import { SanService } from './san.service';
export declare class SanController {
    private readonly sanService;
    private readonly helperService;
    private readonly logger;
    constructor(sanService: SanService, helperService: HelperService);
    create(createSanDto: CreateSanDto, user: UserReqData): Promise<CreateSanDto & import("../database/entities/san.entity").San>;
    exportExcel(filters: FilterData, res: any): Promise<any>;
    findAllForSelectOptions(filters: any): Promise<import("../database/database.service").PaginationResult<any>>;
    findAll(filters: FilterData): Promise<import("../database/database.service").PaginationResult<any>>;
    findOne(id: string): Promise<import("../database/entities/san.entity").San>;
    update(id: string, updateSanDto: UpdateSanDto, user: UserReqData): Promise<import("../database/entities/san.entity").San>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
