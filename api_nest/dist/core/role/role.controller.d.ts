import { UserReqData } from '../users/interfaces/user-req.interface';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { RoleService } from './role.service';
import { FilterData } from '@database/interfaces/filter-data.interface';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    defaultPermission(): Promise<({
        name: string;
        actions: {
            index: boolean;
            create: boolean;
            show: boolean;
            edit: boolean;
            delete: boolean;
            export: boolean;
            showMenu: boolean;
            changePassword: boolean;
        };
    } | {
        name: string;
        actions: {
            index: boolean;
            create: boolean;
            show: boolean;
            edit: boolean;
            delete: boolean;
            export: boolean;
            showMenu: boolean;
            changePassword?: undefined;
        };
    } | {
        name: string;
        actions: {
            index: boolean;
            show: boolean;
            create?: undefined;
            edit?: undefined;
            delete?: undefined;
            export?: undefined;
            showMenu?: undefined;
            changePassword?: undefined;
        };
    })[]>;
    create(createRoleDto: CreateRoleDto, user: UserReqData): Promise<{
        ten_vai_tro: string;
        ma_vai_tro: string;
        phan_quyen: any;
        nguoi_tao: number;
        nguoi_cap_nhat: number;
    } & import("../../database/entities/auth/vai-tro.entity").VaiTro>;
    findAllForSelectOptions(filters: FilterData): Promise<import("../../database/database.service").PaginationResult<any>>;
    findAll(filters: FilterData): Promise<import("../../database/database.service").PaginationResult<any>>;
    findOne(id: number): Promise<{
        phan_quyen: ({
            name: string;
            actions: {
                index: boolean;
                create: boolean;
                show: boolean;
                edit: boolean;
                delete: boolean;
                export: boolean;
                showMenu: boolean;
                changePassword: boolean;
            };
        } | {
            name: string;
            actions: {
                index: boolean;
                create: boolean;
                show: boolean;
                edit: boolean;
                delete: boolean;
                export: boolean;
                showMenu: boolean;
                changePassword?: undefined;
            };
        } | {
            name: string;
            actions: {
                index: boolean;
                show: boolean;
                create?: undefined;
                edit?: undefined;
                delete?: undefined;
                export?: undefined;
                showMenu?: undefined;
                changePassword?: undefined;
            };
        })[];
        id: number;
        ma_vai_tro: string;
        ten_vai_tro: string;
        nguoi_tao: number;
        ngay_tao: Date;
        nguoi_cap_nhat: number;
        ngay_cap_nhat: Date;
        trang_thai: number;
        nguoi_dungs: import("../../database/entities/auth/nguoi-dung.entity").NguoiDung[];
        nguoi_dung_vai_tros: import("../../database/entities/auth/nguoi-dung-vai-tro.entity").NguoiDungVaiTro[];
    }>;
    update(id: number, updateRoleDto: UpdateRoleDto, user: UserReqData): Promise<import("../../database/entities/auth/vai-tro.entity").VaiTro>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
