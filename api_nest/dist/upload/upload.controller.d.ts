/// <reference types="multer" />
import { UploadService } from './upload.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    createMultifile(user: UserReqData, files: Array<Express.Multer.File>): Promise<{
        message: string;
        files: Partial<import("../database/entities/system/quan-ly-upload.entity").QuanLyUpload>[];
    }>;
    create(user: UserReqData, file: Express.Multer.File): Promise<Partial<import("../database/entities/system/quan-ly-upload.entity").QuanLyUpload>>;
    createMultifileSecret(user: UserReqData, files: Array<Express.Multer.File>): Promise<{
        message: string;
        files: Partial<import("../database/entities/system/quan-ly-upload.entity").QuanLyUpload>[];
    }>;
    createSecret(user: UserReqData, file: Express.Multer.File): Promise<Partial<import("../database/entities/system/quan-ly-upload.entity").QuanLyUpload>>;
}
