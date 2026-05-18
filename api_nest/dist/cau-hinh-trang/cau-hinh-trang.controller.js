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
exports.CauHinhTrangController = void 0;
const common_1 = require("@nestjs/common");
const cau_hinh_trang_service_1 = require("./cau-hinh-trang.service");
const user_decorator_1 = require("../core/decorators/user.decorator");
const check_permission_decorator_1 = require("../core/decorators/check-permission.decorator");
const main_config_1 = require("../configs/main.config");
let CauHinhTrangController = class CauHinhTrangController {
    constructor(service) {
        this.service = service;
    }
    findAll() {
        return this.service.findAll();
    }
    findPublic() {
        return this.service.findPublic();
    }
    updateMany(configs, user) {
        return this.service.updateMany(configs, user);
    }
};
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.index),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CauHinhTrangController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('public'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CauHinhTrangController.prototype, "findPublic", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.edit),
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], CauHinhTrangController.prototype, "updateMany", null);
CauHinhTrangController = __decorate([
    (0, common_1.Controller)('cau-hinh-trang'),
    __metadata("design:paramtypes", [cau_hinh_trang_service_1.CauHinhTrangService])
], CauHinhTrangController);
exports.CauHinhTrangController = CauHinhTrangController;
//# sourceMappingURL=cau-hinh-trang.controller.js.map