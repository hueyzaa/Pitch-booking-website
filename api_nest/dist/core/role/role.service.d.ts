import { FilterData } from '@database/interfaces/filter-data.interface';
import { DatabaseService } from 'src/database/database.service';
import { NguoiDung } from 'src/database/entities/auth/nguoi-dung.entity';
import { VaiTro } from 'src/database/entities/auth/vai-tro.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
export declare class RoleService {
    private rolesRepository;
    private readonly databaseService;
    private readonly logger;
    constructor(rolesRepository: Repository<VaiTro>, databaseService: DatabaseService);
    create(createRoleDto: CreateRoleDto): Promise<{
        ten_vai_tro: string;
        ma_vai_tro: string;
        phan_quyen: any;
        nguoi_tao: number;
        nguoi_cap_nhat: number;
    } & VaiTro>;
    findAll(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
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
        nguoi_dungs: NguoiDung[];
        nguoi_dung_vai_tros: import("../../database/entities/auth/nguoi-dung-vai-tro.entity").NguoiDungVaiTro[];
    }>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<VaiTro>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
    findForSelectOptions(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
}
