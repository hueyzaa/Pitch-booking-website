import { HelperService } from '@helper/helper.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { CreateDatSanDto, UpdateDatSanDto } from './dto/dat-san.dto';
import { DatSanService } from './dat-san.service';
export declare class DatSanController {
    private readonly datSanService;
    private readonly helperService;
    private readonly logger;
    constructor(datSanService: DatSanService, helperService: HelperService);
    findBookedSlots(id_san: string, ngay: string): any[] | Promise<import("../database/entities/trang-thai-san.entity").TrangThaiSan[]>;
    publicBook(body: any): Promise<{
        ma_dat_san: string;
        id_doi_tuong: number;
        tong_tien: number;
        phan_tram_giam_gia: number;
        nguoi_tao: number;
        nguoi_cap_nhat: number;
        id_khach_hang: number;
        id_san: number;
        ngay_dat: string;
        gio_bat_dau: string;
        gio_ket_thuc: string;
        trang_thai: number;
        ghi_chu?: string;
    } & import("../database/entities/dat-san.entity").DatSan>;
    findMyBookings(tai_khoan: string): any[] | Promise<import("../database/entities/dat-san.entity").DatSan[]>;
    create(createDatSanDto: CreateDatSanDto, user: UserReqData): Promise<{
        ma_dat_san: string;
        id_doi_tuong: number;
        tong_tien: number;
        phan_tram_giam_gia: number;
        id_khach_hang: number;
        id_san: number;
        ngay_dat: string;
        gio_bat_dau: string;
        gio_ket_thuc: string;
        trang_thai: number;
        ghi_chu?: string;
        nguoi_tao?: number;
        nguoi_cap_nhat?: number;
    } & import("../database/entities/dat-san.entity").DatSan>;
    exportExcel(filters: FilterData, res: any): Promise<any>;
    findAllForSelectOptions(filters: any): Promise<import("../database/database.service").PaginationResult<any>>;
    findAll(filters: FilterData): Promise<import("../database/database.service").PaginationResult<any>>;
    findOne(id: string): Promise<import("../database/entities/dat-san.entity").DatSan>;
    update(id: string, updateDatSanDto: UpdateDatSanDto, user: UserReqData): Promise<import("../database/entities/dat-san.entity").DatSan>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
