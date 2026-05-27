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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nguoi_dung_entity_1 = require("../../database/entities/auth/nguoi-dung.entity");
const vai_tro_entity_1 = require("../../database/entities/auth/vai-tro.entity");
const nguoi_dung_vai_tro_entity_1 = require("../../database/entities/auth/nguoi-dung-vai-tro.entity");
const helper_service_1 = require("../../helper/helper.service");
const core_exception_1 = require("../exceptions/core.exception");
let AuthController = class AuthController {
    constructor(authService, usersService, userService, sessionService, otpService, helperService, dataSource) {
        this.authService = authService;
        this.usersService = usersService;
        this.userService = userService;
        this.sessionService = sessionService;
        this.otpService = otpService;
        this.helperService = helperService;
        this.dataSource = dataSource;
    }
    async register(body) {
        const nguoiDungRepo = this.dataSource.getRepository(nguoi_dung_entity_1.NguoiDung);
        const existingUser = await nguoiDungRepo.findOne({
            where: [
                { tai_khoan: body.tai_khoan },
                { email: body.email },
                { so_dien_thoai: body.so_dien_thoai },
            ],
        });
        if (existingUser) {
            throw new core_exception_1.HttpCoreException('Tài khoản, email hoặc số điện thoại đã tồn tại trong hệ thống', contanst_1.HTTP_CODE.BAD_REQUEST);
        }
        const hashedPassword = await this.helperService.genHashedPassword(body.mat_khau);
        const ho_va_ten = `${body.ho || ''} ${body.ten || ''}`.trim();
        const newUser = nguoiDungRepo.create({
            ho: body.ho || '',
            ten: body.ten || '',
            ho_va_ten: ho_va_ten || 'Khách hàng',
            tai_khoan: body.tai_khoan,
            mat_khau: hashedPassword,
            email: body.email,
            so_dien_thoai: body.so_dien_thoai,
            ngay_sinh: body.ngay_sinh ? new Date(body.ngay_sinh) : new Date(),
            gioi_tinh: body.gioi_tinh !== undefined ? body.gioi_tinh : 1,
            dia_chi: body.dia_chi || '',
            tinh_id: body.tinh_id || 0,
            xa_id: body.xa_id || 0,
            ma_vai_tro: 'USER',
            trang_thai: 1,
            id_doi_tuong: 1,
            nguoi_tao: 0,
            nguoi_cap_nhat: 0,
        });
        const savedUser = await nguoiDungRepo.save(newUser);
        const vaiTroRepo = this.dataSource.getRepository(vai_tro_entity_1.VaiTro);
        const nguoiDungVaiTroRepo = this.dataSource.getRepository(nguoi_dung_vai_tro_entity_1.NguoiDungVaiTro);
        const customerRole = await vaiTroRepo.findOne({ where: { ma_vai_tro: 'USER' } });
        if (customerRole) {
            await nguoiDungVaiTroRepo.save(nguoiDungVaiTroRepo.create({
                nguoi_dung_id: savedUser.id,
                vai_tro_id: customerRole.id,
            }));
        }
        return {
            message: 'Đăng ký tài khoản thành công',
            user: {
                id: savedUser.id,
                tai_khoan: savedUser.tai_khoan,
                email: savedUser.email,
            },
        };
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
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
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
    __param(6, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        profile_service_1.UserService,
        session_service_1.SessionService,
        otp_service_1.OtpService,
        helper_service_1.HelperService,
        typeorm_2.DataSource])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map