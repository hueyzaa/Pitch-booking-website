import { HelperService } from '@helper/helper.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { CreateBangGiaDto, UpdateBangGiaDto } from './dto/bang-gia.dto';
import { BangGiaService } from './bang-gia.service';
export declare class BangGiaController {
    private readonly bangGiaService;
    private readonly helperService;
    private readonly logger;
    constructor(bangGiaService: BangGiaService, helperService: HelperService);
    create(createBangGiaDto: CreateBangGiaDto, user: UserReqData): Promise<CreateBangGiaDto & import("../database/entities/bang-gia.entity").BangGia>;
    exportExcel(filters: FilterData, res: any): Promise<any>;
    findAllForSelectOptions(filters: any): Promise<import("../database/database.service").PaginationResult<any>>;
    findAll(filters: FilterData): Promise<import("../database/database.service").PaginationResult<any>>;
    findOne(id: string): Promise<import("../database/entities/bang-gia.entity").BangGia>;
    update(id: string, updateBangGiaDto: UpdateBangGiaDto, user: UserReqData): Promise<import("../database/entities/bang-gia.entity").BangGia>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
