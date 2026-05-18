"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CauHinhTrangModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cau_hinh_trang_entity_1 = require("../database/entities/system/cau-hinh-trang.entity");
const cau_hinh_trang_controller_1 = require("./cau-hinh-trang.controller");
const cau_hinh_trang_service_1 = require("./cau-hinh-trang.service");
let CauHinhTrangModule = class CauHinhTrangModule {
};
CauHinhTrangModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cau_hinh_trang_entity_1.CauHinhTrang])],
        controllers: [cau_hinh_trang_controller_1.CauHinhTrangController],
        providers: [cau_hinh_trang_service_1.CauHinhTrangService],
    })
], CauHinhTrangModule);
exports.CauHinhTrangModule = CauHinhTrangModule;
//# sourceMappingURL=cau-hinh-trang.module.js.map