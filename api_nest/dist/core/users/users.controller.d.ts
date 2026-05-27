import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';
import { UserReqData } from './interfaces/user-req.interface';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUsersDto: CreateUsersDto, user: UserReqData): Promise<import("../../database/entities/auth/nguoi-dung.entity").NguoiDung>;
    findAllForSelectOptions(filters: any): Promise<import("../../database/database.service").PaginationResult<any>>;
    findAll(filters: FilterData): Promise<import("../../database/database.service").PaginationResult<any>>;
    findOne(id: string): Promise<{
        vai_tro_ids: number[];
        id: number;
        nguoi_tao: number;
        ngay_tao: Date;
        nguoi_cap_nhat: number;
        ngay_cap_nhat: Date;
        tai_khoan: string;
        mat_khau: string;
        so_dien_thoai: string;
        email: string;
        ma_vai_tro: string;
        reset_pass_token: string;
        avatar: string;
        ho: string;
        ten: string;
        ho_va_ten: string;
        id_doi_tuong: number;
        san_yeu_thich: string;
        ngay_sinh: Date;
        gioi_tinh: number;
        dia_chi: string;
        tinh_id: number;
        xa_id: number;
        trang_thai: number;
        need_change_password: number;
        last_password_change: Date;
        otp_secret: string;
        is_otp_verify: number;
        last_otp_verified: Date;
        ma_vai_tro2: import("../../database/entities/auth/vai-tro.entity").VaiTro;
        tinh: import("../../database/entities/common/tinh.entity").Tinh;
        xa: import("../../database/entities/common/xa.entity").Xa;
        doi_tuong: import("../../database/entities/doi-tuong.entity").DoiTuong;
        nguoi_dung_thiet_bis: import("../../database/entities/auth/nguoi-dung-thiet-bi.entity").NguoiDungThietBi[];
        thong_baos: import("../../database/entities/system/thong-bao.entity").ThongBao[];
        nguoi_dung_vai_tros: import("../../database/entities/auth/nguoi-dung-vai-tro.entity").NguoiDungVaiTro[];
    }>;
    update(id: string, updateUsersDto: UpdateUsersDto, user: UserReqData): Promise<any>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    deleteMany(body: any): Promise<{
        success: boolean;
    }>;
    changePassword(id: string, body: {
        mat_khau: string;
    }): Promise<import("../../database/entities/auth/nguoi-dung.entity").NguoiDung>;
    addManyUsersToRole(body: any): Promise<{
        success: boolean;
        added: number[];
    }>;
}
