import { HelperService } from '@helper/helper.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { CreateQuanLyGiaDto, UpdateQuanLyGiaDto } from './dto/quan-ly-gia.dto';
import { QuanLyGiaService } from './quan-ly-gia.service';
export declare class QuanLyGiaController {
    private readonly quanLyGiaService;
    private readonly helperService;
    private readonly logger;
    constructor(quanLyGiaService: QuanLyGiaService, helperService: HelperService);
    create(createQuanLyGiaDto: CreateQuanLyGiaDto, user: UserReqData): Promise<{
        don_gia: number;
        id_san: number;
        id_bang_gia?: number;
        id_doi_tuong?: number;
        gia_theo_gio: number;
        ngay_bat_dau?: string;
        ngay_ket_thuc?: string;
        trang_thai?: number;
        ghi_chu?: string;
        nguoi_tao?: number;
        nguoi_cap_nhat?: number;
    } & import("../database/entities/quan-ly-gia.entity").QuanLyGia>;
    exportExcel(filters: FilterData, res: any): Promise<any>;
    findAllForSelectOptions(filters: any): Promise<import("../database/database.service").PaginationResult<any>>;
    findPriceBySan(id_san: string): Promise<import("../database/entities/quan-ly-gia.entity").QuanLyGia>;
    findAll(filters: FilterData): Promise<import("../database/database.service").PaginationResult<any>>;
    findOne(id: string): Promise<import("../database/entities/quan-ly-gia.entity").QuanLyGia>;
    update(id: string, updateQuanLyGiaDto: UpdateQuanLyGiaDto, user: UserReqData): Promise<import("../database/entities/quan-ly-gia.entity").QuanLyGia>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
