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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const user_decorator_1 = require("../decorators/user.decorator");
const profile_dto_1 = require("./dto/profile.dto");
const profile_service_1 = require("./profile.service");
const upload_service_1 = require("../../upload/upload.service");
const contanst_1 = require("../../configs/contanst");
let ProfileController = class ProfileController {
    constructor(profileService, uploadService) {
        this.profileService = profileService;
        this.uploadService = uploadService;
    }
    async uploadAvatar(file, user) {
        const data = {
            original_name: file.originalname,
            file_path: file.destination.replace(/^./, '') + '/' + file.filename,
            mime_type: file.mimetype,
            destination: file.destination,
            file_name: file.filename,
            path: file.path,
            size: file.size,
            file_type: file.mimetype,
            loai_file: contanst_1.LOAI_FILE.PUBLIC,
            nguoi_tao: user.id,
            nguoi_cap_nhat: user.id,
        };
        this.uploadService.create(data);
        return this.profileService.updateAvatar(user.id, data.file_path);
    }
    getProfile(user) {
        return this.profileService.findOneByUsernameOrEmailOrSDT(user.tai_khoan);
    }
    update(user, updateSelfDto) {
        return this.profileService.update(user.id, updateSelfDto);
    }
    async changePassword(changePasswordDto, user) {
        return this.profileService.changePassword(user.tai_khoan, changePasswordDto);
    }
    async updatePassword(updatePasswordDto, user) {
        return this.profileService.updatePassword(user, updatePasswordDto);
    }
    remove(user) {
        return this.profileService.remove(user.id);
    }
};
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/uploads/avatar',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                return cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "getProfile", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)(),
    __param(0, (0, user_decorator_1.UserReq)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_dto_1.UpdateSelfDto]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)('/change-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dto_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "changePassword", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)('/update-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dto_1.UpdatePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(''),
    __param(0, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "remove", null);
ProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_service_1.UserService,
        upload_service_1.UploadService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map