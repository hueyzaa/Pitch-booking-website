"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckTokenAndDeviceIdFromParamsMiddleware = void 0;
const auth_service_1 = require("../auth/auth.service");
const common_1 = require("@nestjs/common");
const core_exception_1 = require("../exceptions/core.exception");
const contanst_1 = require("../../configs/contanst");
let CheckTokenAndDeviceIdFromParamsMiddleware = class CheckTokenAndDeviceIdFromParamsMiddleware {
    constructor(authService) {
        this.authService = authService;
    }
    async use(req, res, next) {
        const deviceId = req.query.device_id || req.params.device_id;
        if (typeof deviceId !== 'string' || !deviceId) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.MISSING_DEVICE_ID, contanst_1.HTTP_CODE.FORBIDDEN);
        }
        const token = req.query.token || req.params.token;
        if (typeof token !== 'string' || !token) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.MISSING_TOKEN, contanst_1.HTTP_CODE.FORBIDDEN);
        }
        try {
            const user = await this.authService.verifyToken(token);
            req['user'] = user;
            next();
        }
        catch (error) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.INVALID_TOKEN, contanst_1.HTTP_CODE.FORBIDDEN);
        }
    }
};
CheckTokenAndDeviceIdFromParamsMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], CheckTokenAndDeviceIdFromParamsMiddleware);
exports.CheckTokenAndDeviceIdFromParamsMiddleware = CheckTokenAndDeviceIdFromParamsMiddleware;
//# sourceMappingURL=check-token-from-params.middleware.js.map