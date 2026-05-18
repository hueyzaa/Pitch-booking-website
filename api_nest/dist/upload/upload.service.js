"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UploadService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const quan_ly_upload_entity_1 = require("../database/entities/system/quan-ly-upload.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");
const contanst_1 = require("../configs/contanst");
const core_exception_1 = require("../core/exceptions/core.exception");
const upload_config_1 = require("./upload.config");
let UploadService = UploadService_1 = class UploadService {
    constructor(quanLyUploadRepository) {
        this.quanLyUploadRepository = quanLyUploadRepository;
        this.logger = new common_1.Logger(UploadService_1.name);
    }
    async create(quanLyUpload) {
        return this.quanLyUploadRepository.insert(quanLyUpload);
    }
    async saveFileFromMemory(file, userId, isPublic = true) {
        if (!file) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.FILE_NOT_FOUND, contanst_1.HTTP_CODE.BAD_REQUEST);
        }
        const isImage = file.mimetype.startsWith('image/');
        const maxSize = isImage ? upload_config_1.FILE_SIZE_LIMIT.IMAGE : upload_config_1.FILE_SIZE_LIMIT.DEFAULT;
        if (file.size > maxSize) {
            throw new core_exception_1.HttpCoreException(`File vượt quá dung lượng cho phép ${isImage ? '25MB' : '5MB'}`, contanst_1.HTTP_CODE.BAD_REQUEST);
        }
        const uploadDir = isPublic ? upload_config_1.UPLOAD_DIR.PUBLIC : upload_config_1.UPLOAD_DIR.SECRET;
        await fs.mkdir(uploadDir, { recursive: true });
        const finalFilename = 'upload-' +
            Date.now() +
            (isImage ? '.jpeg' : path.extname(file.originalname));
        const finalPath = path.join(uploadDir, finalFilename);
        if (isImage) {
            await sharp(file.buffer)
                .resize({ width: 1024, withoutEnlargement: true })
                .jpeg({ quality: 80 })
                .toFile(finalPath);
        }
        else {
            await fs.writeFile(finalPath, new Uint8Array(file.buffer));
        }
        const stat = await fs.stat(finalPath);
        const relativePath = uploadDir.replace(/^\./, '');
        const webPath = path.join(relativePath, finalFilename).replace(/\\/g, '/');
        const data = {
            original_name: file.originalname,
            file_path: webPath,
            mime_type: isImage ? 'image/jpeg' : file.mimetype,
            destination: uploadDir,
            file_name: finalFilename,
            path: finalPath,
            size: stat.size,
            file_type: isImage ? 'image/jpeg' : file.mimetype,
            loai_file: isPublic ? contanst_1.LOAI_FILE.PUBLIC : contanst_1.LOAI_FILE.SECRET,
            nguoi_tao: userId,
            nguoi_cap_nhat: userId,
        };
        await this.create(data);
        return data;
    }
    async saveFileMetadata(file, userId, loaiFile) {
        const relativePath = file.destination.replace(/^\./, '');
        const webPath = path.join(relativePath, file.filename).replace(/\\/g, '/');
        const data = {
            original_name: file.originalname,
            file_path: webPath,
            mime_type: file.mimetype,
            destination: file.destination,
            file_name: file.filename,
            path: file.path,
            size: file.size,
            file_type: file.mimetype,
            loai_file: loaiFile,
            nguoi_tao: userId,
            nguoi_cap_nhat: userId,
        };
        await this.create(data);
        return data;
    }
};
UploadService = UploadService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quan_ly_upload_entity_1.QuanLyUpload)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map