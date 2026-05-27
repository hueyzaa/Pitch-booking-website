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
var DanhGiaController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DanhGiaController = void 0;
const core_exception_1 = require("../core/exceptions/core.exception");
const helper_service_1 = require("../helper/helper.service");
const main_config_1 = require("../configs/main.config");
const check_permission_decorator_1 = require("../core/decorators/check-permission.decorator");
const user_decorator_1 = require("../core/decorators/user.decorator");
const common_1 = require("@nestjs/common");
const danh_gia_dto_1 = require("./dto/danh-gia.dto");
const danh_gia_service_1 = require("./danh-gia.service");
let DanhGiaController = DanhGiaController_1 = class DanhGiaController {
    constructor(danhGiaService, helperService) {
        this.danhGiaService = danhGiaService;
        this.helperService = helperService;
        this.logger = new common_1.Logger(DanhGiaController_1.name);
    }
    async getSummaryBySan(idSan) {
        if (!idSan || isNaN(+idSan)) {
            throw new core_exception_1.HttpCoreException('ID sân không hợp lệ', '400');
        }
        const data = await this.danhGiaService.getSummaryBySanId(+idSan);
        return data;
    }
    async getReviewsBySan(idSan, page = '1', limit = '10') {
        if (!idSan || isNaN(+idSan)) {
            throw new core_exception_1.HttpCoreException('ID sân không hợp lệ', '400');
        }
        const data = await this.danhGiaService.findBySanId(+idSan, +page, +limit);
        return data;
    }
    async publicCreate(dto) {
        const data = await this.danhGiaService.publicCreate(dto);
        return data;
    }
    create(createDanhGiaDto, user) {
        createDanhGiaDto.nguoi_tao = user.id;
        createDanhGiaDto.nguoi_cap_nhat = user.id;
        return this.danhGiaService.create(createDanhGiaDto);
    }
    async exportExcel(filters, res) {
        filters.limit = -1;
        const data = await this.danhGiaService.findAllWithPagination(filters);
        if (data.total > 0) {
            const xlsxBuffer = await this.helperService.jsonToXlsx(data.collection);
            return res
                .set('Content-Disposition', `attachment; filename=${Date.now()}.xlsx`)
                .send(xlsxBuffer);
        }
        else {
            throw new core_exception_1.HttpCoreException('Không tồn tại dữ liệu');
        }
    }
    findAllForSelectOptions(filters) {
        return this.danhGiaService.findForSelectOptions(filters);
    }
    findAll(filters) {
        return this.danhGiaService.findAllWithPagination(filters);
    }
    findOne(id) {
        return this.danhGiaService.findOneById(+id);
    }
    update(id, updateDanhGiaDto, user) {
        updateDanhGiaDto.nguoi_cap_nhat = user.id;
        return this.danhGiaService.update(+id, updateDanhGiaDto);
    }
    remove(id) {
        return this.danhGiaService.remove(+id);
    }
};
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('public/summary/:id_san'),
    __param(0, (0, common_1.Param)('id_san')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DanhGiaController.prototype, "getSummaryBySan", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('public/:id_san'),
    __param(0, (0, common_1.Param)('id_san')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DanhGiaController.prototype, "getReviewsBySan", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('public'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [danh_gia_dto_1.PublicCreateDanhGiaDto]),
    __metadata("design:returntype", Promise)
], DanhGiaController.prototype, "publicCreate", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.create),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [danh_gia_dto_1.CreateDanhGiaDto, Object]),
    __metadata("design:returntype", void 0)
], DanhGiaController.prototype, "create", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.export),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('excel'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DanhGiaController.prototype, "exportExcel", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('options'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DanhGiaController.prototype, "findAllForSelectOptions", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.index),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DanhGiaController.prototype, "findAll", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.show),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DanhGiaController.prototype, "findOne", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.edit),
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, danh_gia_dto_1.UpdateDanhGiaDto, Object]),
    __metadata("design:returntype", void 0)
], DanhGiaController.prototype, "update", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.delete),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DanhGiaController.prototype, "remove", null);
DanhGiaController = DanhGiaController_1 = __decorate([
    (0, common_1.Controller)('danh-gia'),
    __metadata("design:paramtypes", [danh_gia_service_1.DanhGiaService,
        helper_service_1.HelperService])
], DanhGiaController);
exports.DanhGiaController = DanhGiaController;
//# sourceMappingURL=danh-gia.controller.js.map