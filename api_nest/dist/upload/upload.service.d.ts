/// <reference types="multer" />
import { QuanLyUpload } from '@database/entities/system/quan-ly-upload.entity';
import { Repository } from 'typeorm';
export declare class UploadService {
    private readonly quanLyUploadRepository;
    private readonly logger;
    constructor(quanLyUploadRepository: Repository<QuanLyUpload>);
    create(quanLyUpload: Partial<QuanLyUpload>[] | Partial<QuanLyUpload>): Promise<import("typeorm").InsertResult>;
    saveFileFromMemory(file: Express.Multer.File, userId: number, isPublic?: boolean): Promise<Partial<QuanLyUpload>>;
    saveFileMetadata(file: Express.Multer.File, userId: number, loaiFile: string): Promise<Partial<QuanLyUpload>>;
}
