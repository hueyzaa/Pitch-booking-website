"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XaModule = void 0;
const common_1 = require("@nestjs/common");
const xa_service_1 = require("./xa.service");
const xa_controller_1 = require("./xa.controller");
let XaModule = class XaModule {
};
XaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [],
        controllers: [xa_controller_1.XaController],
        providers: [xa_service_1.XaService],
        exports: [xa_service_1.XaService],
    })
], XaModule);
exports.XaModule = XaModule;
//# sourceMappingURL=xa.module.js.map