import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { CreateThongBaoDto, UpdateThongBaoDto } from './dto/thong-bao.dto';
import { ThongBaoService } from './thong-bao.service';
export declare class ThongBaoController {
    private readonly thongBaoService;
    constructor(thongBaoService: ThongBaoService);
    create(createThongBaoDto: CreateThongBaoDto, user: UserReqData): Promise<CreateThongBaoDto & import("../database/entities/system/thong-bao.entity").ThongBao>;
    findAllForSelectOptions(filters: any): Promise<import("../database/database.service").PaginationResult<any>>;
    findAll(filters: FilterData): Promise<import("../database/database.service").PaginationResult<any>>;
    findOne(id: string): Promise<import("../database/entities/system/thong-bao.entity").ThongBao>;
    markAllRead(user: UserReqData): Promise<import("typeorm").UpdateResult>;
    update(id: string, updateThongBaoDto: UpdateThongBaoDto, user: UserReqData): Promise<import("../database/entities/system/thong-bao.entity").ThongBao>;
    deleteAll(user: UserReqData): Promise<import("typeorm").DeleteResult>;
    bulkDelete(ids: number[]): Promise<import("typeorm").DeleteResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
