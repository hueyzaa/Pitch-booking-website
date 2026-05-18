import { UserService } from './../core/profile/profile.service';
import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { CreateLogThaoTacDto } from './dto/log-thao-tac.dto';
import { ForgotPassDto } from '@core/auth/dto/auth.dto';
import { LogThaoTac } from '@database/entities/system/log-thao-tac.entity';
import { NguoiDung } from '@database/entities/auth/nguoi-dung.entity';
export declare class LogThaoTacService {
    private readonly databaseService;
    private readonly userService;
    private logThaoTacRepo;
    private cacheManager;
    private readonly dataSource;
    private readonly logger;
    constructor(databaseService: DatabaseService, userService: UserService, logThaoTacRepo: Repository<LogThaoTac>, cacheManager: Cache, dataSource: DataSource);
    findAllWithPagination(filters: FilterData): Promise<import("src/database/database.service").PaginationResult<any>>;
    findAll(options?: FindManyOptions<LogThaoTac>): Promise<LogThaoTac[]>;
    create(createLogThaoTacDto: CreateLogThaoTacDto): Promise<{
        user_id: number;
        ho_ten: string;
        url: string;
        mo_ta_url: string;
        mo_ta: string;
        phan_loai: string;
        muc_do: string;
        noi_dung: string;
        ket_qua: string;
    } & LogThaoTac>;
    checkRouteAndReturnResult: (url: string) => string;
    convertMethod: (method: string) => "Xem dữ liệu" | "Tạo mới dữ liệu" | "Cập nhật dữ liệu" | "Xóa dữ liệu" | "Khác";
    convertSeverity: (originalUrl: string, method: string) => string;
    convertType: (originalUrl: string) => string;
    logLogin(user: NguoiDung): Promise<{
        user_id: number;
        ho_ten: string;
        url: string;
        mo_ta_url: string;
        mo_ta: string;
        phan_loai: string;
        muc_do: string;
        noi_dung: string;
        ket_qua: string;
    } & LogThaoTac>;
    logLogout(userID: number): Promise<{
        user_id: number;
        ho_ten: string;
        url: string;
        mo_ta_url: string;
        mo_ta: string;
        phan_loai: string;
        muc_do: string;
        noi_dung: string;
        ket_qua: string;
    } & LogThaoTac>;
    logForgotPassword(data: ForgotPassDto): Promise<{
        user_id: number;
        ho_ten: string;
        url: string;
        mo_ta_url: string;
        mo_ta: string;
        phan_loai: string;
        muc_do: string;
        noi_dung: string;
        ket_qua: string;
    } & LogThaoTac>;
}
