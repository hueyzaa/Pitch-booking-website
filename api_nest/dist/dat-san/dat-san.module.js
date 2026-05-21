"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatSanModule = void 0;
const common_1 = require("@nestjs/common");
const dat_san_service_1 = require("./dat-san.service");
const dat_san_controller_1 = require("./dat-san.controller");
const typeorm_1 = require("@nestjs/typeorm");
const dat_san_entity_1 = require("../database/entities/dat-san.entity");
const thu_chi_entity_1 = require("../database/entities/thu-chi.entity");
const doi_tuong_entity_1 = require("../database/entities/doi-tuong.entity");
const quan_ly_gia_entity_1 = require("../database/entities/quan-ly-gia.entity");
const trang_thai_san_entity_1 = require("../database/entities/trang-thai-san.entity");
let DatSanModule = class DatSanModule {
};
DatSanModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([dat_san_entity_1.DatSan, thu_chi_entity_1.ThuChi, doi_tuong_entity_1.DoiTuong, quan_ly_gia_entity_1.QuanLyGia, trang_thai_san_entity_1.TrangThaiSan])],
        controllers: [dat_san_controller_1.DatSanController],
        providers: [dat_san_service_1.DatSanService],
        exports: [dat_san_service_1.DatSanService],
    })
], DatSanModule);
exports.DatSanModule = DatSanModule;
//# sourceMappingURL=dat-san.module.js.map