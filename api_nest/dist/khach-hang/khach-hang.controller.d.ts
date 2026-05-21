import { HelperService } from '@helper/helper.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { CreateKhachHangDto, UpdateKhachHangDto } from './dto/khach-hang.dto';
import { KhachHangService } from './khach-hang.service';
export declare class KhachHangController {
    private readonly khachHangService;
    private readonly helperService;
    private readonly logger;
    constructor(khachHangService: KhachHangService, helperService: HelperService);
    create(createKhachHangDto: CreateKhachHangDto, user: UserReqData): Promise<CreateKhachHangDto & import("../database/entities/khach-hang.entity").KhachHang>;
    exportExcel(filters: FilterData, res: any): Promise<any>;
    findAllForSelectOptions(filters: any): Promise<import("../database/database.service").PaginationResult<any>>;
    findAll(filters: FilterData): Promise<import("../database/database.service").PaginationResult<any>>;
    findOne(id: string): Promise<import("../database/entities/khach-hang.entity").KhachHang>;
    update(id: string, updateKhachHangDto: UpdateKhachHangDto, user: UserReqData): Promise<import("../database/entities/khach-hang.entity").KhachHang>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
