/// <reference types="multer" />
import { CauHinhTrangService } from './cau-hinh-trang.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
export declare class CauHinhTrangController {
    private readonly service;
    constructor(service: CauHinhTrangService);
    private fileToBase64;
    findAll(): Promise<import("../database/entities/system/cau-hinh-trang.entity").CauHinhTrang[]>;
    findPublic(): Promise<import("../database/entities/system/cau-hinh-trang.entity").CauHinhTrang[]>;
    updateMany(body: any, user: UserReqData, files: Express.Multer.File[]): Promise<import("../database/entities/system/cau-hinh-trang.entity").CauHinhTrang[]>;
}
