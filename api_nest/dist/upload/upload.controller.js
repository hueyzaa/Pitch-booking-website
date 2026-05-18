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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("./upload.service");
const contanst_1 = require("../configs/contanst");
const user_decorator_1 = require("../core/decorators/user.decorator");
const upload_config_1 = require("./upload.config");
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async createMultifile(user, files) {
        if (!files || files.length === 0) {
            throw new Error('No files uploaded');
        }
        const result = await Promise.all(files.map((file) => this.uploadService.saveFileMetadata(file, user.id, contanst_1.LOAI_FILE.PUBLIC)));
        return {
            message: 'Tải lên thành công',
            files: result,
        };
    }
    async create(user, file) {
        return this.uploadService.saveFileFromMemory(file, user.id, true);
    }
    async createMultifileSecret(user, files) {
        if (!files || files.length === 0) {
            throw new Error('No files uploaded');
        }
        const result = await Promise.all(files.map((file) => this.uploadService.saveFileMetadata(file, user.id, contanst_1.LOAI_FILE.SECRET)));
        return {
            message: 'Tải lên thành công',
            files: result,
        };
    }
    async createSecret(user, file) {
        if (!file) {
            throw new Error('No file uploaded');
        }
        return this.uploadService.saveFileMetadata(file, user.id, contanst_1.LOAI_FILE.SECRET);
    }
};
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('multiple'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, (0, upload_config_1.createMulterOptions)(upload_config_1.UPLOAD_DIR.PUBLIC))),
    __param(0, (0, user_decorator_1.UserReq)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "createMultifile", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', (0, upload_config_1.createMemoryMulterOptions)())),
    __param(0, (0, user_decorator_1.UserReq)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('secret/multiple'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, (0, upload_config_1.createMulterOptions)(upload_config_1.UPLOAD_DIR.SECRET))),
    __param(0, (0, user_decorator_1.UserReq)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "createMultifileSecret", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('secret'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', (0, upload_config_1.createMulterOptions)(upload_config_1.UPLOAD_DIR.SECRET))),
    __param(0, (0, user_decorator_1.UserReq)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "createSecret", null);
UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map