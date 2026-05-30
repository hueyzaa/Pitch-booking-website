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
var HeThongController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeThongController = void 0;
const main_config_1 = require("../configs/main.config");
const check_permission_decorator_1 = require("../core/decorators/check-permission.decorator");
const user_decorator_1 = require("../core/decorators/user.decorator");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer = require("multer");
const sharp = require("sharp");
const he_thong_dto_1 = require("./dto/he-thong.dto");
const he_thong_service_1 = require("./he-thong.service");
let HeThongController = HeThongController_1 = class HeThongController {
    constructor(heThongService) {
        this.heThongService = heThongService;
        this.logger = new common_1.Logger(HeThongController_1.name);
    }
    async create(createHeThongDto, user, file) {
        createHeThongDto.nguoi_tao = user.id;
        createHeThongDto.nguoi_cap_nhat = user.id;
        if (file) {
            const resizedBuffer = await sharp(file.buffer)
                .resize({ width: 1024, withoutEnlargement: true })
                .jpeg({ quality: 80 })
                .toBuffer();
            createHeThongDto.logoUrl = `data:image/jpeg;base64,${resizedBuffer.toString('base64')}`;
        }
        return this.heThongService.create(createHeThongDto);
    }
    async getLatestRecord() {
        return this.heThongService.getLatestRecord();
    }
};
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.create),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/update-logo-va-ten'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: multer.memoryStorage() })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserReq)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [he_thong_dto_1.CreateHeThongDto, Object, Object]),
    __metadata("design:returntype", Promise)
], HeThongController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('/get-logo-va-ten'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HeThongController.prototype, "getLatestRecord", null);
HeThongController = HeThongController_1 = __decorate([
    (0, common_1.Controller)('he-thong'),
    __metadata("design:paramtypes", [he_thong_service_1.HeThongService])
], HeThongController);
exports.HeThongController = HeThongController;
//# sourceMappingURL=he-thong.controller.js.map