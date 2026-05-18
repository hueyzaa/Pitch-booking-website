import { HelperService } from '@helper/helper.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { CreateLogThaoTacDto } from './dto/log-thao-tac.dto';
import { LogThaoTacService } from './log-thao-tac.service';
export declare class LogThaoTacController {
    private readonly logThaoTacService;
    private readonly helperService;
    private readonly logger;
    constructor(logThaoTacService: LogThaoTacService, helperService: HelperService);
    create(createLogThaoTacDto: CreateLogThaoTacDto, user: UserReqData): Promise<{
        user_id: number;
        ho_ten: string;
        url: string;
        mo_ta_url: string;
        mo_ta: string;
        phan_loai: string;
        muc_do: string;
        noi_dung: string;
        ket_qua: string;
    } & import("../database/entities/system/log-thao-tac.entity").LogThaoTac>;
    exportExcel(filters: FilterData, res: any): Promise<any>;
    findAll(filters: FilterData): Promise<import("../database/database.service").PaginationResult<any>>;
}
