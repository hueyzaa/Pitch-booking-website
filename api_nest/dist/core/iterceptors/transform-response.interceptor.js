"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const main_config_1 = require("../../configs/main.config");
let TransformResponseInterceptor = class TransformResponseInterceptor {
    intercept(context, next) {
        const request = context.getArgByIndex(0);
        const url = request.url;
        return next.handle().pipe((0, operators_1.map)((data) => {
            if (main_config_1.default.responseInterceptorExcludePaths.test(url)) {
                return data;
            }
            return { code: 200, status: true, message: 'OK', data };
        }));
    }
};
TransformResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformResponseInterceptor);
exports.TransformResponseInterceptor = TransformResponseInterceptor;
//# sourceMappingURL=transform-response.interceptor.js.map