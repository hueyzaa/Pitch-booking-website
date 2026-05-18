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
var QuanLyUploadController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuanLyUploadController = void 0;
const helper_service_1 = require("../helper/helper.service");
const main_config_1 = require("../configs/main.config");
const check_permission_decorator_1 = require("../core/decorators/check-permission.decorator");
const common_1 = require("@nestjs/common");
const quan_ly_upload_service_1 = require("./quan-ly-upload.service");
const user_decorator_1 = require("../core/decorators/user.decorator");
let QuanLyUploadController = QuanLyUploadController_1 = class QuanLyUploadController {
    constructor(quanLyUploadService, helperService) {
        this.quanLyUploadService = quanLyUploadService;
        this.helperService = helperService;
        this.logger = new common_1.Logger(QuanLyUploadController_1.name);
    }
    findAllForSelectOptions(filters) {
        return this.quanLyUploadService.findForSelectOptions(filters);
    }
    findAll(filters, user) {
        return this.quanLyUploadService.findAllWithPagination(filters, user.id);
    }
    findOne(id, user) {
        return this.quanLyUploadService.findOneByIdWithPermission(+id, user.id);
    }
    async grantViewPermission(id, body, user) {
        await this.quanLyUploadService.grantViewPermission(+id, body.user_ids, user.id);
        return { success: true };
    }
    remove(id) {
        return this.quanLyUploadService.remove(+id);
    }
};
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('options'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuanLyUploadController.prototype, "findAllForSelectOptions", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.index),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], QuanLyUploadController.prototype, "findAll", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.show),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuanLyUploadController.prototype, "findOne", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.edit),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(':id/grant-view'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuanLyUploadController.prototype, "grantViewPermission", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.delete),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuanLyUploadController.prototype, "remove", null);
QuanLyUploadController = QuanLyUploadController_1 = __decorate([
    (0, common_1.Controller)('quan-ly-upload'),
    __metadata("design:paramtypes", [quan_ly_upload_service_1.QuanLyUploadService,
        helper_service_1.HelperService])
], QuanLyUploadController);
exports.QuanLyUploadController = QuanLyUploadController;
//# sourceMappingURL=quan-ly-upload.controller.js.map