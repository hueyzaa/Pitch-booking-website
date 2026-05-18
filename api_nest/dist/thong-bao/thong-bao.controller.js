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
exports.ThongBaoController = void 0;
const main_config_1 = require("../configs/main.config");
const check_permission_decorator_1 = require("../core/decorators/check-permission.decorator");
const user_decorator_1 = require("../core/decorators/user.decorator");
const common_1 = require("@nestjs/common");
const thong_bao_dto_1 = require("./dto/thong-bao.dto");
const thong_bao_service_1 = require("./thong-bao.service");
let ThongBaoController = class ThongBaoController {
    constructor(thongBaoService) {
        this.thongBaoService = thongBaoService;
    }
    create(createThongBaoDto, user) {
        createThongBaoDto.nguoi_tao = user.id;
        createThongBaoDto.nguoi_cap_nhat = user.id;
        return this.thongBaoService.create(createThongBaoDto);
    }
    findAllForSelectOptions(filters) {
        return this.thongBaoService.findForSelectOptions(filters);
    }
    findAll(filters) {
        return this.thongBaoService.findAllWithPagination(filters);
    }
    findOne(id) {
        return this.thongBaoService.findOneById(+id);
    }
    markAllRead(user) {
        return this.thongBaoService.markAllRead(user.id);
    }
    update(id, updateThongBaoDto, user) {
        updateThongBaoDto.nguoi_cap_nhat = user.id;
        return this.thongBaoService.update(+id, updateThongBaoDto);
    }
    deleteAll(user) {
        return this.thongBaoService.deleteAllByUserId(user.id);
    }
    bulkDelete(ids) {
        return this.thongBaoService.bulkDelete(ids);
    }
    remove(id) {
        return this.thongBaoService.remove(+id);
    }
};
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.create),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [thong_bao_dto_1.CreateThongBaoDto, Object]),
    __metadata("design:returntype", void 0)
], ThongBaoController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('options'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ThongBaoController.prototype, "findAllForSelectOptions", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.index),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ThongBaoController.prototype, "findAll", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.show),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ThongBaoController.prototype, "findOne", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.edit),
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)('mark-all-read'),
    __param(0, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ThongBaoController.prototype, "markAllRead", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.edit),
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, thong_bao_dto_1.UpdateThongBaoDto, Object]),
    __metadata("design:returntype", void 0)
], ThongBaoController.prototype, "update", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.delete),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)('all'),
    __param(0, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ThongBaoController.prototype, "deleteAll", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.delete),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('bulk-delete'),
    __param(0, (0, common_1.Body)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ThongBaoController.prototype, "bulkDelete", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.delete),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ThongBaoController.prototype, "remove", null);
ThongBaoController = __decorate([
    (0, common_1.Controller)('thong-bao'),
    __metadata("design:paramtypes", [thong_bao_service_1.ThongBaoService])
], ThongBaoController);
exports.ThongBaoController = ThongBaoController;
//# sourceMappingURL=thong-bao.controller.js.map