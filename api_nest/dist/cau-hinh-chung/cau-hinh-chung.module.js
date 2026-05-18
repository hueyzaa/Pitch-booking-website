"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CauHinhChungModule = void 0;
const common_1 = require("@nestjs/common");
const cau_hinh_chung_service_1 = require("./cau-hinh-chung.service");
const cau_hinh_chung_controller_1 = require("./cau-hinh-chung.controller");
let CauHinhChungModule = class CauHinhChungModule {
};
CauHinhChungModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [],
        controllers: [cau_hinh_chung_controller_1.CauHinhChungController],
        providers: [cau_hinh_chung_service_1.CauHinhChungService],
        exports: [cau_hinh_chung_service_1.CauHinhChungService],
    })
], CauHinhChungModule);
exports.CauHinhChungModule = CauHinhChungModule;
//# sourceMappingURL=cau-hinh-chung.module.js.map