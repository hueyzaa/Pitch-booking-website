import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CauHinhTrang } from '@database/entities/system/cau-hinh-trang.entity';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { UpdateCauHinhTrangDto } from './dto/update-cau-hinh-trang.dto';
export declare class CauHinhTrangService implements OnModuleInit {
    private readonly repo;
    private readonly logger;
    constructor(repo: Repository<CauHinhTrang>);
    onModuleInit(): Promise<void>;
    findAll(): Promise<CauHinhTrang[]>;
    findPublic(): Promise<CauHinhTrang[]>;
    updateMany(configs: UpdateCauHinhTrangDto[], user: UserReqData): Promise<CauHinhTrang[]>;
    private seedDefaults;
}
