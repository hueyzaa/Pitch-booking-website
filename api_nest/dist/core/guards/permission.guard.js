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
var PermissionGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGuard = void 0;
const contanst_1 = require("../../configs/contanst");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_service_1 = require("../auth/auth.service");
const core_exception_1 = require("../exceptions/core.exception");
let PermissionGuard = PermissionGuard_1 = class PermissionGuard {
    constructor(reflector, authService) {
        this.reflector = reflector;
        this.authService = authService;
        this.logger = new common_1.Logger(PermissionGuard_1.name);
    }
    canActivate(context) {
        var _a;
        const action = this.reflector.get('action', context.getHandler());
        if (!action) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const perName = request.url.split('/')[1].split('?')[0];
        const isAllowAccess = this.authService.checkUserPermission(request['user'], perName, action);
        this.logger.debug(((_a = request['user']) === null || _a === void 0 ? void 0 : _a['tai_khoan']) + ' -> ' + perName + ' -> ' + isAllowAccess);
        if (!isAllowAccess) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.PERMISSION_DENY, contanst_1.HTTP_CODE.UNAUTHORIZED);
        }
        return true;
    }
};
PermissionGuard = PermissionGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        auth_service_1.AuthService])
], PermissionGuard);
exports.PermissionGuard = PermissionGuard;
//# sourceMappingURL=permission.guard.js.map