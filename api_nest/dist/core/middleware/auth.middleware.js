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
exports.AuthMiddleware = void 0;
const contanst_1 = require("../../configs/contanst");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const core_exception_1 = require("../exceptions/core.exception");
const profile_service_1 = require("../profile/profile.service");
let AuthMiddleware = class AuthMiddleware {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async use(req, res, next) {
        const token = (req.headers.authorization ||
            req.cookies['token'] ||
            '').replace('Bearer ', '');
        if (!token) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.INVALID_TOKEN, contanst_1.HTTP_CODE.FORBIDDEN);
        }
        const signData = await this.authService.verifyToken(token);
        const user = await this.userService.findOneByUserName(signData.tai_khoan);
        req['user'] = user;
        next();
    }
};
AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        profile_service_1.UserService])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map