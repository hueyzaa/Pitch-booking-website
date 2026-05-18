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
exports.SecureResourceAccessMiddleware = void 0;
const contanst_1 = require("../../configs/contanst");
const profile_service_1 = require("../profile/profile.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const helper_service_1 = require("../../helper/helper.service");
const core_exception_1 = require("../exceptions/core.exception");
const nguoi_dung_thiet_bi_entity_1 = require("../../database/entities/auth/nguoi-dung-thiet-bi.entity");
const log_entity_1 = require("../../database/entities/system/log.entity");
let SecureResourceAccessMiddleware = class SecureResourceAccessMiddleware {
    constructor(userService, helperService, configService, nguoiDungThietBiRepository, logRepository) {
        this.userService = userService;
        this.helperService = helperService;
        this.configService = configService;
        this.nguoiDungThietBiRepository = nguoiDungThietBiRepository;
        this.logRepository = logRepository;
    }
    async use(req, res, next) {
        try {
            const { userId, originalUrl, deviceId, timestamp, signature } = req.query;
            if (typeof userId !== 'string' || !userId) {
                throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.MISSING_TOKEN, contanst_1.HTTP_CODE.FORBIDDEN);
            }
            const nguoiDungThietBi = await this.nguoiDungThietBiRepository.findOne({
                where: {
                    nguoi_dung_id: parseInt(userId, 10),
                    device_id: deviceId,
                },
            });
            if (!nguoiDungThietBi) {
                throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.NOT_FOUND_OR_INACTIVE, contanst_1.HTTP_CODE.FORBIDDEN);
            }
            const currentTime = Math.floor(Date.now() / 1000);
            const urlTime = parseInt(timestamp, 10);
            const image_token_expires_time = this.configService.get('env.image_token_expires_time');
            console.log('image_token_expires_time', image_token_expires_time);
            if (currentTime - urlTime > parseInt(image_token_expires_time, 10) * 60) {
                throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.TOKEN_NOT_FOUND, contanst_1.HTTP_CODE.FORBIDDEN);
            }
            const user = await this.userService.findOneById(parseInt(userId, 10));
            if (!user) {
                throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.NOT_FOUND_OR_INACTIVE, contanst_1.HTTP_CODE.FORBIDDEN);
            }
            const expectedSignature = await this.helperService.generateSecureUrl({
                userId: nguoiDungThietBi.nguoi_dung_id.toString(),
                originalUrlBase64: originalUrl,
                token: nguoiDungThietBi.access_token,
                deviceId: nguoiDungThietBi.device_id,
                timestamp: timestamp,
            });
            if (expectedSignature.signature !== signature) {
                throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.INVALID_TOKEN, contanst_1.HTTP_CODE.FORBIDDEN);
            }
            req['user'] = user;
            next();
        }
        catch (error) {
            if (error instanceof core_exception_1.HttpCoreException) {
                throw error;
            }
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.INVALID_TOKEN, contanst_1.HTTP_CODE.FORBIDDEN);
        }
    }
};
SecureResourceAccessMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(nguoi_dung_thiet_bi_entity_1.NguoiDungThietBi)),
    __param(4, (0, typeorm_1.InjectRepository)(log_entity_1.Log)),
    __metadata("design:paramtypes", [profile_service_1.UserService,
        helper_service_1.HelperService,
        config_1.ConfigService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SecureResourceAccessMiddleware);
exports.SecureResourceAccessMiddleware = SecureResourceAccessMiddleware;
//# sourceMappingURL=secure-resource-access.middleware.js.map