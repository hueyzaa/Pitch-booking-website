"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuanLyGiaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const quan_ly_gia_service_1 = require("./quan-ly-gia.service");
const quan_ly_gia_controller_1 = require("./quan-ly-gia.controller");
const quan_ly_gia_entity_1 = require("../database/entities/quan-ly-gia.entity");
const doi_tuong_entity_1 = require("../database/entities/doi-tuong.entity");
let QuanLyGiaModule = class QuanLyGiaModule {
};
QuanLyGiaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([quan_ly_gia_entity_1.QuanLyGia, doi_tuong_entity_1.DoiTuong])],
        controllers: [quan_ly_gia_controller_1.QuanLyGiaController],
        providers: [quan_ly_gia_service_1.QuanLyGiaService],
        exports: [quan_ly_gia_service_1.QuanLyGiaService],
    })
], QuanLyGiaModule);
exports.QuanLyGiaModule = QuanLyGiaModule;
//# sourceMappingURL=quan-ly-gia.module.js.map