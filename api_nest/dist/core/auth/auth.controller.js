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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../decorators/user.decorator");
const throttler_1 = require("@nestjs/throttler");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const users_service_1 = require("../users/users.service");
const contanst_1 = require("../../configs/contanst");
const session_service_1 = require("../session/session.service");
const profile_service_1 = require("../profile/profile.service");
const otp_service_1 = require("../otp/otp.service");
let AuthController = class AuthController {
    constructor(authService, usersService, userService, sessionService, otpService) {
        this.authService = authService;
        this.usersService = usersService;
        this.userService = userService;
        this.sessionService = sessionService;
        this.otpService = otpService;
    }
    async login(loginUserDto, userReq) {
        return await this.authService.login(loginUserDto, userReq.device_id, userReq.re_capcha_token);
    }
    async logout(userReq) {
        return await this.authService.logout({
            device_id: userReq.device_id,
            nguoi_dung_id: userReq.id,
        });
    }
    async forgotPassword(body) {
        return await this.authService.forgotPassword(body);
    }
    async resetPassword(body) {
        return await this.authService.resetPassword(body);
    }
    async generateOtp(body) {
        const user = await this.userService.findOneByEmail(body.email);
        if (!user) {
            throw new common_1.HttpException(contanst_1.HTTP_CODE.NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
        }
        return await this.otpService.handleOtp(user);
    }
    async verifyOtp(userReq, body) {
        const user = await this.userService.findOneByEmail(body.email);
        if (!user) {
            throw new common_1.HttpException(contanst_1.HTTP_CODE.NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
        }
        return await this.otpService.verifyOtp(body.otp, user, userReq.device_id);
    }
    async setFirebaseToken(body, userReq) {
        return await this.authService.setFirebaseToken(body, userReq);
    }
    async updatePersonalRole(body, userReq) {
        return await this.authService.updatePersonalRole(body, userReq);
    }
};
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/login'),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: (0, throttler_1.seconds)(60) } }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/logout'),
    __param(0, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/forgot-password'),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: (0, throttler_1.seconds)(60) } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ForgotPassDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/reset-password'),
    (0, throttler_1.Throttle)({ default: { limit: 1, ttl: (0, throttler_1.seconds)(1) } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/generate-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generateOtp", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/verify-otp'),
    __param(0, (0, user_decorator_1.UserReq)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/set-firebase-token'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SetFirebaseTokenDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setFirebaseToken", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/update-personal-role'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserReq)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.UpdatePersonalRoleDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePersonalRole", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        profile_service_1.UserService,
        session_service_1.SessionService,
        otp_service_1.OtpService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map