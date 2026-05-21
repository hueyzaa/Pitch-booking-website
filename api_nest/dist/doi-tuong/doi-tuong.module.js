"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoiTuongModule = void 0;
const common_1 = require("@nestjs/common");
const doi_tuong_service_1 = require("./doi-tuong.service");
const doi_tuong_controller_1 = require("./doi-tuong.controller");
let DoiTuongModule = class DoiTuongModule {
};
DoiTuongModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [],
        controllers: [doi_tuong_controller_1.DoiTuongController],
        providers: [doi_tuong_service_1.DoiTuongService],
        exports: [doi_tuong_service_1.DoiTuongService],
    })
], DoiTuongModule);
exports.DoiTuongModule = DoiTuongModule;
//# sourceMappingURL=doi-tuong.module.js.map