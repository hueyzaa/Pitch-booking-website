"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrangThaiSanModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const trang_thai_san_service_1 = require("./trang-thai-san.service");
const trang_thai_san_controller_1 = require("./trang-thai-san.controller");
const trang_thai_san_entity_1 = require("../database/entities/trang-thai-san.entity");
let TrangThaiSanModule = class TrangThaiSanModule {
};
TrangThaiSanModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([trang_thai_san_entity_1.TrangThaiSan])],
        controllers: [trang_thai_san_controller_1.TrangThaiSanController],
        providers: [trang_thai_san_service_1.TrangThaiSanService],
        exports: [trang_thai_san_service_1.TrangThaiSanService],
    })
], TrangThaiSanModule);
exports.TrangThaiSanModule = TrangThaiSanModule;
//# sourceMappingURL=trang-thai-san.module.js.map