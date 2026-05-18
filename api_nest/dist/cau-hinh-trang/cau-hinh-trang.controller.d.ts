import { CauHinhTrangService } from './cau-hinh-trang.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { UpdateCauHinhTrangDto } from './dto/update-cau-hinh-trang.dto';
export declare class CauHinhTrangController {
    private readonly service;
    constructor(service: CauHinhTrangService);
    findAll(): Promise<import("../database/entities/system/cau-hinh-trang.entity").CauHinhTrang[]>;
    findPublic(): Promise<import("../database/entities/system/cau-hinh-trang.entity").CauHinhTrang[]>;
    updateMany(configs: UpdateCauHinhTrangDto[], user: UserReqData): Promise<import("../database/entities/system/cau-hinh-trang.entity").CauHinhTrang[]>;
}
