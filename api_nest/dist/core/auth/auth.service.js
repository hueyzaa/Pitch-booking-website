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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const contanst_1 = require("../../configs/contanst");
const globalConfig_service_1 = require("../globalconfig/globalConfig.service");
const otp_service_1 = require("../otp/otp.service");
const session_dto_1 = require("../session/dto/session.dto");
const session_service_1 = require("../session/session.service");
const users_service_1 = require("../users/users.service");
const nguoi_dung_thiet_bi_entity_1 = require("../../database/entities/auth/nguoi-dung-thiet-bi.entity");
const nguoi_dung_vai_tro_entity_1 = require("../../database/entities/auth/nguoi-dung-vai-tro.entity");
const nguoi_dung_entity_1 = require("../../database/entities/auth/nguoi-dung.entity");
const helper_service_1 = require("../../helper/helper.service");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const moment = require("moment");
const log_thao_tac_service_1 = require("../../log-thao-tac/log-thao-tac.service");
const typeorm_2 = require("typeorm");
const email_service_1 = require("../email/email.service");
const core_exception_1 = require("../exceptions/core.exception");
const profile_service_1 = require("../profile/profile.service");
const auth_helpers_1 = require("./helpers/auth.helpers");
let AuthService = AuthService_1 = class AuthService {
    constructor(jwtService, userService, usersService, emailService, helperService, configService, sessionService, logThaoTacService, globalConfigService, otpService, nguoiDungRepo, nguoiDungVaiTroRepo, cacheManager, dataSource, nguoiDungThietBiRepo) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.usersService = usersService;
        this.emailService = emailService;
        this.helperService = helperService;
        this.configService = configService;
        this.sessionService = sessionService;
        this.logThaoTacService = logThaoTacService;
        this.globalConfigService = globalConfigService;
        this.otpService = otpService;
        this.nguoiDungRepo = nguoiDungRepo;
        this.nguoiDungVaiTroRepo = nguoiDungVaiTroRepo;
        this.cacheManager = cacheManager;
        this.dataSource = dataSource;
        this.nguoiDungThietBiRepo = nguoiDungThietBiRepo;
        this.logger = new common_1.Logger(AuthService_1.name);
        this.verifyCaptcha = async (token) => {
            const url = this.configService.get('env.url_recapcha');
            const secretKey = this.configService.get('env.re_capcha_secret_key');
            if (!url) {
                throw new core_exception_1.HttpCoreException('Chưa cấu hình url recaptcha', contanst_1.HTTP_CODE.INTERNAL_ERROR);
            }
            if (!secretKey) {
                throw new core_exception_1.HttpCoreException('Chưa cấu hình secret key recaptcha', contanst_1.HTTP_CODE.INTERNAL_ERROR);
            }
            const maskedSecret = secretKey
                ? `${secretKey.substring(0, 3)}...${secretKey.substring(secretKey.length - 3)}`
                : 'null';
            this.logger.debug(`@verifyCaptcha >> Initiating verify with secret: ${maskedSecret}, token length: ${token === null || token === void 0 ? void 0 : token.length}`);
            const params = new URLSearchParams();
            params.append('secret', secretKey);
            params.append('response', token);
            try {
                const response = await axios_1.default.post(url, params.toString(), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                if (!response.data.success) {
                    const errorCodes = response.data['error-codes'];
                    this.logger.debug(`@verifyCaptcha >> Verification Failed: ${JSON.stringify(errorCodes)}`);
                    this.logger.debug(`@verifyCaptcha >> Google Response Detail: ${JSON.stringify(response.data)}`);
                }
                else {
                    this.logger.debug(`@verifyCaptcha >> Verification Success!`);
                }
                return response.data.success;
            }
            catch (error) {
                this.logger.error(`@verifyCaptcha >> Request Error: ${error.message}`);
                return false;
            }
        };
    }
    async authenticationWithUsernameAndPassword(taikhoan, matkhau) {
        try {
            const findUser = await this.userService.findOneByUsernameOrEmailOrSDT(taikhoan);
            const check = await this.helperService.compareHashed(matkhau, findUser.mat_khau);
            if (!check) {
                throw new Error(contanst_1.CORE_COMMON_ERROR.INVALID_USERNAME_OR_PASSWORD);
            }
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async login(payload, device_id, reCapchaValue) {
        const MAX_ATTEMPTS_BEFORE_RECAPTCHA = this.configService.get('env.max_attempts_before_recaptcha');
        const authConfig = await this.getAuthConfig();
        const loginData = await auth_helpers_1.AuthHelpers.getLoginDataFromCache(this.cacheManager, payload.tai_khoan);
        await this.validateAccountLockStatus(loginData, authConfig);
        await this.verifyRecaptchaIfRequired(loginData, MAX_ATTEMPTS_BEFORE_RECAPTCHA, authConfig.RECAPTCHA_REQUIRED, reCapchaValue);
        try {
            await this.authenticationWithUsernameAndPassword(payload.tai_khoan, payload.mat_khau);
            await auth_helpers_1.AuthHelpers.resetLoginAttempts(this.cacheManager, payload.tai_khoan);
            return await this.handleLoginSuccess(payload, device_id, authConfig);
        }
        catch (error) {
            if (error instanceof core_exception_1.HttpCoreException) {
                throw error;
            }
            return await this.handleLoginFailure(payload.tai_khoan, loginData, authConfig, MAX_ATTEMPTS_BEFORE_RECAPTCHA);
        }
    }
    async getAuthConfig() {
        const config = await this.globalConfigService.getConfigsByKeysCache([
            contanst_1.CONFIG_KEY_AND_DEFAULT_VALUE.MAX_FAILED_ATTEMPTS,
            contanst_1.CONFIG_KEY_AND_DEFAULT_VALUE.LOCK_TIME,
            contanst_1.CONFIG_KEY_AND_DEFAULT_VALUE.TWO_FACTOR_AUTH,
            contanst_1.CONFIG_KEY_AND_DEFAULT_VALUE.PASS_VALID_TIME,
            contanst_1.CONFIG_KEY_AND_DEFAULT_VALUE.OTP_REAUTH_TTL,
            contanst_1.CONFIG_KEY_AND_DEFAULT_VALUE.CHECK_VALID_PASS,
            contanst_1.CONFIG_KEY_AND_DEFAULT_VALUE.RECAPTCHA_REQUIRED,
        ]);
        return {
            MAX_FAILED_ATTEMPTS: Number(config.MAX_FAILED_ATTEMPTS),
            LOCK_TIME: Number(config.LOCK_TIME),
            TWO_FACTOR_AUTH: Number(config.TWO_FACTOR_AUTH),
            PASS_VALID_TIME: Number(config.PASS_VALID_TIME),
            OTP_REAUTH_TTL: Number(config.OTP_REAUTH_TTL),
            CHECK_VALID_PASS: Number(config.CHECK_VALID_PASS),
            RECAPTCHA_REQUIRED: Number(config.RECAPTCHA_REQUIRED),
        };
    }
    async validateAccountLockStatus(loginData, authConfig) {
        if (loginData.failedAttempts >= authConfig.MAX_FAILED_ATTEMPTS) {
            const now = moment();
            const lockUntil = moment(loginData.lastFailedTime).add(authConfig.LOCK_TIME, 'milliseconds');
            if (now.isBefore(lockUntil)) {
                const lockMessage = auth_helpers_1.AuthHelpers.generateLockMessage(lockUntil, now);
                throw new core_exception_1.HttpCoreException(lockMessage, '423');
            }
            loginData.failedAttempts = 0;
            loginData.lastFailedTime = 0;
            await auth_helpers_1.AuthHelpers.updateFailedLoginAttempts(this.cacheManager, '', loginData, authConfig.LOCK_TIME);
        }
    }
    async verifyRecaptchaIfRequired(loginData, maxAttemptsBeforeRecaptcha, recaptchaRequired, reCapchaValue) {
        const isRecaptchaConfigured = !!process.env.CORE_RECAPCHA_SECRET_KEY;
        if (loginData.failedAttempts >= maxAttemptsBeforeRecaptcha &&
            (recaptchaRequired === contanst_1.STATUS.ACTIVE || isRecaptchaConfigured)) {
            if (!reCapchaValue) {
                throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.RECAPTCHA_REQUIRED, contanst_1.HTTP_CODE.UNAUTHORIZED);
            }
            const captchaValid = await this.verifyCaptcha(reCapchaValue);
            if (!captchaValid) {
                throw new core_exception_1.HttpCoreException('Xác thực reCAPTCHA thất bại. Vui lòng kiểm tra lại', contanst_1.HTTP_CODE.UNAUTHORIZED);
            }
        }
    }
    async handleLoginSuccess(payload, device_id, authConfig) {
        const findUser = await this.userService.findOneByUsernameOrEmailOrSDT(payload.tai_khoan);
        if (payload.app_type === 'admin' && findUser.ma_vai_tro === 'CUSTOMER') {
            throw new core_exception_1.HttpCoreException('Tài khoản không có quyền truy cập trang quản trị', contanst_1.HTTP_CODE.FORBIDDEN);
        }
        const isDeviceVerified = await auth_helpers_1.AuthHelpers.checkDeviceInCache(this.cacheManager, findUser.id, device_id);
        if (!isDeviceVerified && authConfig.TWO_FACTOR_AUTH === contanst_1.STATUS.ACTIVE) {
            await this.otpService.handleOtp(findUser);
            await auth_helpers_1.AuthHelpers.saveDeviceToCache(this.cacheManager, findUser.id, device_id, true, authConfig.OTP_REAUTH_TTL);
            return {
                email: findUser.email,
                requireOtp: true,
            };
        }
        await this.checkOtpExpired(findUser);
        const need_update_password = this.checkPasswordExpiry(findUser, authConfig);
        if (authConfig.TWO_FACTOR_AUTH === contanst_1.STATUS.ACTIVE &&
            findUser.is_otp_verify === contanst_1.IS_OTP_VERIFY.NOT_VERIFY) {
            await this.otpService.handleOtp(findUser);
            return {
                requireOtp: true,
                email: findUser.email,
            };
        }
        const token = await this.createAccessToken(findUser);
        await this.createUserSession(findUser, token, payload.firebase_token, device_id);
        await this.logThaoTacService.logLogin(findUser);
        const sanitizedUser = auth_helpers_1.AuthHelpers.sanitizeUserData(findUser);
        return Object.assign(Object.assign({}, sanitizedUser), { token, need_update_password });
    }
    async handleLoginFailure(username, loginData, authConfig, maxAttemptsBeforeRecaptcha) {
        const now = moment();
        loginData.failedAttempts += 1;
        loginData.lastFailedTime = now.valueOf();
        await auth_helpers_1.AuthHelpers.updateFailedLoginAttempts(this.cacheManager, username, loginData, authConfig.LOCK_TIME);
        const remainingAttempts = authConfig.MAX_FAILED_ATTEMPTS - loginData.failedAttempts;
        const isRecaptchaConfigured = !!process.env.CORE_RECAPCHA_SECRET_KEY;
        if (loginData.failedAttempts >= maxAttemptsBeforeRecaptcha &&
            (authConfig.RECAPTCHA_REQUIRED === contanst_1.STATUS.ACTIVE || isRecaptchaConfigured)) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.RECAPTCHA_REQUIRED, contanst_1.HTTP_CODE.UNAUTHORIZED);
        }
        if (remainingAttempts > 0) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR_CUSTOM.INVALID_LOGIN_ATTEMPTS(remainingAttempts), '401');
        }
        else {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR_CUSTOM.ACCOUNT_LOCKED(moment.duration(authConfig.LOCK_TIME).asMinutes()), '423');
        }
    }
    async createAccessToken(user) {
        const expiresTime = this.configService.get('env.jwt_expires_time');
        if (!expiresTime) {
            throw new core_exception_1.HttpCoreException('Chưa cấu hình thời gian hết hạn của token', contanst_1.HTTP_CODE.INTERNAL_ERROR);
        }
        return await auth_helpers_1.AuthHelpers.generateAccessToken(this.helperService, user, {
            expiresIn: expiresTime,
        });
    }
    async createUserSession(user, token, firebaseToken, deviceId) {
        const createSessionDto = new session_dto_1.CreateSessionDto();
        createSessionDto.nguoi_dung_id = user.id;
        createSessionDto.access_token = token;
        createSessionDto.firebase_token = firebaseToken || '';
        createSessionDto.device_id = deviceId;
        createSessionDto.nguoi_tao = user.id;
        createSessionDto.nguoi_cap_nhat = user.id;
        await this.sessionService.insertSession(createSessionDto);
    }
    checkPasswordExpiry(user, authConfig) {
        if (authConfig.CHECK_VALID_PASS !== contanst_1.VALID_PASS.VALID) {
            return false;
        }
        const lastPasswordChange = user.last_password_change;
        if (!lastPasswordChange) {
            return false;
        }
        const daysSinceLastChange = moment().diff(moment(lastPasswordChange), 'days');
        return daysSinceLastChange >= authConfig.PASS_VALID_TIME;
    }
    async verifyToken(token) {
        try {
            const verifyToken = this.jwtService.verify(token);
            const checkTokenDB = await this.sessionService.checkTokenInDB(verifyToken.id, token);
            if (!checkTokenDB) {
                throw new Error();
            }
            return verifyToken;
        }
        catch (error) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.INVALID_TOKEN, contanst_1.HTTP_CODE.FORBIDDEN);
        }
    }
    async verifyTokenWorkingHours(token) {
        if (!token) {
            return null;
        }
        try {
            const verifyToken = this.jwtService.verify(token);
            const checkTokenDB = await this.sessionService.checkTokenInDB(verifyToken.id, token);
            if (!checkTokenDB) {
                return null;
            }
            return verifyToken;
        }
        catch (error) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.INVALID_TOKEN, contanst_1.HTTP_CODE.FORBIDDEN);
        }
    }
    async logout(data) {
        await this.sessionService.removeSession(data.nguoi_dung_id, data.device_id);
        await this.logThaoTacService.logLogout(data.nguoi_dung_id);
        return contanst_1.CORE_COMMON_MESSAGE.LOGOUT_SUCCESS;
    }
    async forgotPassword(data) {
        const nguoiDung = await this.userService.findOneByUsernameOrEmailOrSDT(data.tai_khoan);
        if (nguoiDung.email !== data.email) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.INVALID_EMAIL, contanst_1.HTTP_CODE.UNAUTHORIZED);
        }
        const token = await auth_helpers_1.AuthHelpers.generateResetPasswordToken(this.jwtService, nguoiDung);
        await this.userService.updateResetPassToken(nguoiDung.tai_khoan, token);
        await this.emailService.sendResetPassEmail(nguoiDung, token);
        await this.logThaoTacService.logForgotPassword(data);
        return contanst_1.CORE_COMMON_MESSAGE.FORGOT_PASSWORD_SUCCESS;
    }
    async resetPassword(body) {
        let resetPassData = null;
        try {
            resetPassData = await auth_helpers_1.AuthHelpers.verifyResetPasswordToken(this.jwtService, body.token_reset_pass);
        }
        catch (error) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.RESET_PASSWORD_SESSION_EXPIRES, contanst_1.HTTP_CODE.FORBIDDEN);
        }
        const user = await this.userService.findOneByUsernameOrEmailOrSDT(resetPassData.tai_khoan);
        if (user.reset_pass_token !== body.token_reset_pass) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.RESET_PASSWORD_SESSION_EXPIRES, contanst_1.HTTP_CODE.FORBIDDEN);
        }
        await this.userService.updateResetPassToken(resetPassData.tai_khoan, '');
        const newPass = await this.helperService.genHashedPassword(body.mat_khau_moi);
        await this.userService.updateNewPassword(resetPassData.email, newPass);
        return contanst_1.CORE_COMMON_MESSAGE.RESET_PASSWORD_SUCCESS;
    }
    checkUserPermission(userReq, baseUrl, action) {
        if (!(userReq === null || userReq === void 0 ? void 0 : userReq.phan_quyen)) {
            return false;
        }
        const perrmission = JSON.parse(userReq.phan_quyen);
        const urlPerrmission = perrmission.find((per) => per.name === baseUrl);
        if (!urlPerrmission) {
            return false;
        }
        return urlPerrmission['actions'][action];
    }
    async checkOtpExpired(user) {
        const renewOtp = await this.globalConfigService.getConfigByKeyCache('OTP_REAUTH_TTL');
        const now = moment();
        const lastOtpTime = moment(user.last_otp_verified);
        const diff = now.diff(lastOtpTime, 'milliseconds');
        if (diff >= Number(renewOtp)) {
            await this.usersService.updateIsOtpVerify(user.id, contanst_1.IS_OTP_VERIFY.NOT_VERIFY);
            return true;
        }
        return false;
    }
    async generateUpdatePassToken(user) {
        return await auth_helpers_1.AuthHelpers.generateUpdatePasswordToken(this.jwtService, user);
    }
    async setFirebaseToken(data, userReq) {
        const user = await this.userService.findOneById(userReq.id);
        if (!user) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.NOT_FOUND_OR_INACTIVE, contanst_1.HTTP_CODE.NOT_FOUND);
        }
        await this.sessionService.updateFirebaseToken(user.id, data.firebase_token || null);
        return contanst_1.CORE_COMMON_MESSAGE.SET_FIREBASE_TOKEN_SUCCESS;
    }
    async updatePersonalRole(data, userReq) {
        const user = await this.userService.findOneByUsernameOrEmailOrSDT(userReq.tai_khoan);
        if (!user) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.NOT_FOUND_OR_INACTIVE, contanst_1.HTTP_CODE.NOT_FOUND);
        }
        const personalRole = await this.nguoiDungVaiTroRepo.find({
            where: { nguoi_dung_id: user.id },
            relations: { vai_tro: true },
            select: {
                vai_tro: {
                    id: true,
                    ten_vai_tro: true,
                    ma_vai_tro: true,
                    phan_quyen: true,
                },
            },
        });
        const checkVaiTro = personalRole.find((item) => item.vai_tro.ma_vai_tro === data.ma_vai_tro);
        if (!checkVaiTro) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.NOT_FOUND_OR_INACTIVE, contanst_1.HTTP_CODE.NOT_FOUND);
        }
        await this.nguoiDungThietBiRepo.delete({
            nguoi_dung_id: userReq.id,
            device_id: (0, typeorm_2.Not)(userReq.device_id),
        });
        const res = await this.nguoiDungRepo.update(user.id, {
            ma_vai_tro: data.ma_vai_tro,
        });
        if (res.affected === 0) {
            throw new core_exception_1.HttpCoreException('Cập nhật vai trò thất bại', contanst_1.HTTP_CODE.NOT_FOUND);
        }
        const userFinal = await this.userService.findOneByUsernameOrEmailOrSDT(user.tai_khoan);
        return auth_helpers_1.AuthHelpers.sanitizeUserData(userFinal);
    }
};
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(10, (0, typeorm_1.InjectRepository)(nguoi_dung_entity_1.NguoiDung)),
    __param(11, (0, typeorm_1.InjectRepository)(nguoi_dung_vai_tro_entity_1.NguoiDungVaiTro)),
    __param(12, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(13, (0, typeorm_1.InjectDataSource)()),
    __param(14, (0, typeorm_1.InjectRepository)(nguoi_dung_thiet_bi_entity_1.NguoiDungThietBi)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        profile_service_1.UserService,
        users_service_1.UsersService,
        email_service_1.EmailService,
        helper_service_1.HelperService,
        config_1.ConfigService,
        session_service_1.SessionService,
        log_thao_tac_service_1.LogThaoTacService,
        globalConfig_service_1.GlobalConfigService,
        otp_service_1.OtpService,
        typeorm_2.Repository,
        typeorm_2.Repository, Object, typeorm_2.DataSource,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map