"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleModuleModule = void 0;
const common_1 = require("@nestjs/common");
const example_module_controller_1 = require("./example-module.controller");
const example_module_service_1 = require("./example-module.service");
let ExampleModuleModule = class ExampleModuleModule {
};
ExampleModuleModule = __decorate([
    (0, common_1.Module)({
        controllers: [example_module_controller_1.ExampleModuleController],
        providers: [example_module_service_1.ExampleModuleService],
    })
], ExampleModuleModule);
exports.ExampleModuleModule = ExampleModuleModule;
//# sourceMappingURL=example-module.module.js.map