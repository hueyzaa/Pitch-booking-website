"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderCheckerMiddleware = void 0;
const contanst_1 = require("../../configs/contanst");
const common_1 = require("@nestjs/common");
const core_exception_1 = require("../exceptions/core.exception");
let HeaderCheckerMiddleware = class HeaderCheckerMiddleware {
    async use(req, res, next) {
        const { device_id } = req.headers;
        if (!device_id) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.NOT_DETECT_DEVICE, contanst_1.HTTP_CODE.FORBIDDEN);
        }
        req['device_id'] = device_id;
        next();
    }
};
HeaderCheckerMiddleware = __decorate([
    (0, common_1.Injectable)()
], HeaderCheckerMiddleware);
exports.HeaderCheckerMiddleware = HeaderCheckerMiddleware;
//# sourceMappingURL=header-checker.middleware.js.map