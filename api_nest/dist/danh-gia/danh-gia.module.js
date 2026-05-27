"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DanhGiaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const danh_gia_service_1 = require("./danh-gia.service");
const danh_gia_controller_1 = require("./danh-gia.controller");
const danh_gia_entity_1 = require("../database/entities/danh-gia.entity");
const khach_hang_entity_1 = require("../database/entities/khach-hang.entity");
let DanhGiaModule = class DanhGiaModule {
};
DanhGiaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([danh_gia_entity_1.DanhGia, khach_hang_entity_1.KhachHang])
        ],
        controllers: [danh_gia_controller_1.DanhGiaController],
        providers: [danh_gia_service_1.DanhGiaService],
        exports: [danh_gia_service_1.DanhGiaService],
    })
], DanhGiaModule);
exports.DanhGiaModule = DanhGiaModule;
//# sourceMappingURL=danh-gia.module.js.map