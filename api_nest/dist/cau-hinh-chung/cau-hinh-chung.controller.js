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
var CauHinhChungController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CauHinhChungController = void 0;
const core_exception_1 = require("../core/exceptions/core.exception");
const helper_service_1 = require("../helper/helper.service");
const main_config_1 = require("../configs/main.config");
const check_permission_decorator_1 = require("../core/decorators/check-permission.decorator");
const user_decorator_1 = require("../core/decorators/user.decorator");
const common_1 = require("@nestjs/common");
const cau_hinh_chung_dto_1 = require("./dto/cau-hinh-chung.dto");
const cau_hinh_chung_service_1 = require("./cau-hinh-chung.service");
const contanst_1 = require("../configs/contanst");
let CauHinhChungController = CauHinhChungController_1 = class CauHinhChungController {
    constructor(cauHinhChungService, helperService) {
        this.cauHinhChungService = cauHinhChungService;
        this.helperService = helperService;
        this.logger = new common_1.Logger(CauHinhChungController_1.name);
    }
    create(createCauHinhChungDto, user) {
        createCauHinhChungDto.nguoi_tao = user.id;
        createCauHinhChungDto.nguoi_cap_nhat = user.id;
        return this.cauHinhChungService.create(createCauHinhChungDto);
    }
    async exportExcel(filters, res) {
        filters.limit = -1;
        const data = await this.cauHinhChungService.findAllWithPagination(filters);
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
        return this.cauHinhChungService.findForSelectOptions(filters);
    }
    findAll(filters) {
        return this.cauHinhChungService.findAllWithPagination(filters);
    }
    findSpecificConfigs() {
        return this.cauHinhChungService.findSpecificConfigs();
    }
    findOne(id) {
        return this.cauHinhChungService.findOneById(+id);
    }
    async update(updateConfigsDto, user) {
        if (!Array.isArray(updateConfigsDto)) {
            throw new core_exception_1.HttpCoreException('Dữ liệu không hợp lệ', contanst_1.HTTP_CODE.UNPROCESSABLE_CONTENT);
        }
        const result = await this.cauHinhChungService.updateConfigs(updateConfigsDto, user);
        return { message: 'Cập nhật thành công', result };
    }
    remove(id) {
        return this.cauHinhChungService.remove(+id);
    }
};
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.create),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cau_hinh_chung_dto_1.CreateCauHinhChungDto, Object]),
    __metadata("design:returntype", void 0)
], CauHinhChungController.prototype, "create", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.export),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('excel'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CauHinhChungController.prototype, "exportExcel", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('options'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CauHinhChungController.prototype, "findAllForSelectOptions", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.index),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CauHinhChungController.prototype, "findAll", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.show),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('specific-configs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CauHinhChungController.prototype, "findSpecificConfigs", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.show),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CauHinhChungController.prototype, "findOne", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.edit),
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], CauHinhChungController.prototype, "update", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.delete),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CauHinhChungController.prototype, "remove", null);
CauHinhChungController = CauHinhChungController_1 = __decorate([
    (0, common_1.Controller)('cau-hinh-chung'),
    __metadata("design:paramtypes", [cau_hinh_chung_service_1.CauHinhChungService,
        helper_service_1.HelperService])
], CauHinhChungController);
exports.CauHinhChungController = CauHinhChungController;
//# sourceMappingURL=cau-hinh-chung.controller.js.map