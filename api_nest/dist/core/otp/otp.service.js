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
var OtpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const contanst_1 = require("../../configs/contanst");
const email_service_1 = require("../email/email.service");
const core_exception_1 = require("../exceptions/core.exception");
const profile_service_1 = require("../profile/profile.service");
const session_dto_1 = require("../session/dto/session.dto");
const session_service_1 = require("../session/session.service");
const users_service_1 = require("../users/users.service");
const helper_service_1 = require("../../helper/helper.service");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const speakeasy = require("speakeasy");
let OtpService = OtpService_1 = class OtpService {
    constructor(usersService, userService, emailService, sessionService, helperService, configService, cacheManager) {
        this.usersService = usersService;
        this.userService = userService;
        this.emailService = emailService;
        this.sessionService = sessionService;
        this.helperService = helperService;
        this.configService = configService;
        this.cacheManager = cacheManager;
        this.logger = new common_1.Logger(OtpService_1.name);
    }
    async generateSecretKey(user) {
        const secretKey = speakeasy.generateSecret({
            name: user.tai_khoan,
            length: 20,
        });
        await this.usersService.updateOtpSecret(user.id, secretKey.base32);
        return secretKey.base32;
    }
    async generateOtp(user) {
        const step = 60;
        const otp = speakeasy.totp({
            secret: user.otp_secret,
            encoding: 'base32',
            step,
        });
        const version = new Date().getTime();
        const otpKey = `otp:${user.id}`;
        await this.cacheManager.set(otpKey, JSON.stringify({
            otp,
            version,
        }), step * 1000);
        const currentTime = Math.floor(Date.now() / 1000);
        const expiresIn = currentTime + step;
        return { otp, expiresIn: expiresIn * 1000 };
    }
    async handleOtp(user) {
        if (!user.otp_secret) {
            await this.generateSecretKey(user);
            user = await this.userService.findOneById(user.id);
        }
        const { otp, expiresIn } = await this.generateOtp(user);
        await this.emailService.sendOtpEmail(user, otp);
        return { otp, expiresIn };
    }
    async verifyOtp(inputOtp, user, device_id) {
        const otpKey = `otp:${user.id}`;
        const storedData = await this.cacheManager.get(otpKey);
        if (!storedData) {
            throw new Error('OTP đã hết hạn hoặc không hợp lệ');
        }
        const { otp } = JSON.parse(storedData);
        if (inputOtp !== otp) {
            throw new Error('OTP không hợp lệ');
        }
        const step = 60;
        const isVerified = speakeasy.totp.verify({
            secret: user.otp_secret,
            token: otp,
            encoding: 'base32',
            step,
            window: 3,
        });
        if (!isVerified) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.INVALID_OTP, contanst_1.HTTP_CODE.UNAUTHORIZED);
        }
        await this.usersService.updateIsOtpVerify(user.id, contanst_1.STATUS.ACTIVE);
        const findUser = await this.userService.findOneByUsernameOrEmailOrSDT(user.tai_khoan);
        const expiresTime = this.configService.get('env.jwt_expires_time');
        const token = await this.helperService.signJWTToken(findUser, {
            expiresIn: expiresTime,
        });
        const createSessionDto = new session_dto_1.CreateSessionDto();
        createSessionDto.nguoi_dung_id = findUser.id;
        createSessionDto.access_token = token;
        createSessionDto.firebase_token = '';
        createSessionDto.device_id = device_id || '';
        createSessionDto.nguoi_tao = findUser.id;
        createSessionDto.nguoi_cap_nhat = findUser.id;
        await this.sessionService.insertSession(createSessionDto);
        await this.cacheManager.del(otpKey);
        return Object.assign(Object.assign({}, findUser), { token, isVerified });
    }
};
OtpService = OtpService_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.Injectable)(),
    __param(6, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        profile_service_1.UserService,
        email_service_1.EmailService,
        session_service_1.SessionService,
        helper_service_1.HelperService,
        config_1.ConfigService, Object])
], OtpService);
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map