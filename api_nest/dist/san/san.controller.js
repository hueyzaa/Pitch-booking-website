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
var SanController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanController = void 0;
const core_exception_1 = require("../core/exceptions/core.exception");
const helper_service_1 = require("../helper/helper.service");
const main_config_1 = require("../configs/main.config");
const check_permission_decorator_1 = require("../core/decorators/check-permission.decorator");
const user_decorator_1 = require("../core/decorators/user.decorator");
const common_1 = require("@nestjs/common");
const san_dto_1 = require("./dto/san.dto");
const san_service_1 = require("./san.service");
let SanController = SanController_1 = class SanController {
    constructor(sanService, helperService) {
        this.sanService = sanService;
        this.helperService = helperService;
        this.logger = new common_1.Logger(SanController_1.name);
    }
    create(createSanDto, user) {
        createSanDto.nguoi_tao = user.id;
        createSanDto.nguoi_cap_nhat = user.id;
        return this.sanService.create(createSanDto);
    }
    async exportExcel(filters, res) {
        filters.limit = -1;
        const data = await this.sanService.findAllWithPagination(filters);
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
        return this.sanService.findForSelectOptions(filters);
    }
    findAll(filters) {
        return this.sanService.findAllWithPagination(filters);
    }
    findOne(id) {
        return this.sanService.findOneById(+id);
    }
    update(id, updateSanDto, user) {
        updateSanDto.nguoi_cap_nhat = user.id;
        return this.sanService.update(+id, updateSanDto);
    }
    remove(id) {
        return this.sanService.remove(+id);
    }
};
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.create),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [san_dto_1.CreateSanDto, Object]),
    __metadata("design:returntype", void 0)
], SanController.prototype, "create", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.export),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('excel'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SanController.prototype, "exportExcel", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('options'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SanController.prototype, "findAllForSelectOptions", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.index),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SanController.prototype, "findAll", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.show),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SanController.prototype, "findOne", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.edit),
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, san_dto_1.UpdateSanDto, Object]),
    __metadata("design:returntype", void 0)
], SanController.prototype, "update", null);
__decorate([
    (0, check_permission_decorator_1.CheckPermission)(main_config_1.ACTION.delete),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SanController.prototype, "remove", null);
SanController = SanController_1 = __decorate([
    (0, common_1.Controller)('san'),
    __metadata("design:paramtypes", [san_service_1.SanService,
        helper_service_1.HelperService])
], SanController);
exports.SanController = SanController;
//# sourceMappingURL=san.controller.js.map