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
var SessionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const contanst_1 = require("../../configs/contanst");
const core_exception_1 = require("../exceptions/core.exception");
const nguoi_dung_thiet_bi_entity_1 = require("../../database/entities/auth/nguoi-dung-thiet-bi.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let SessionService = SessionService_1 = class SessionService {
    constructor(nguoiDungThietBiRepo) {
        this.nguoiDungThietBiRepo = nguoiDungThietBiRepo;
        this.logger = new common_1.Logger(SessionService_1.name);
    }
    async insertSession(createSessionDto) {
        try {
            await this.nguoiDungThietBiRepo.save(createSessionDto);
        }
        catch (error) {
            if (new RegExp(contanst_1.DATABASE_GENERAL_ERROR.DUPLICATE_ENTRY).test(error.message)) {
                await this.nguoiDungThietBiRepo.update({
                    nguoi_dung_id: createSessionDto.nguoi_dung_id,
                    device_id: createSessionDto.device_id,
                }, createSessionDto);
            }
            else {
                throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.SAVE_SESSION_FAILED, contanst_1.HTTP_CODE.UNPROCESSABLE_CONTENT);
            }
        }
    }
    async checkTokenInDB(nguoi_dung_id, access_token) {
        const check = await this.nguoiDungThietBiRepo.findOneBy({
            nguoi_dung_id,
            access_token,
        });
        if (!check) {
            return false;
        }
        return true;
    }
    async findOneByNguoiDungId(nguoi_dung_id) {
        return this.nguoiDungThietBiRepo.findOneBy({ nguoi_dung_id });
    }
    async removeSession(nguoi_dung_id, device_id) {
        return this.nguoiDungThietBiRepo.delete({ nguoi_dung_id, device_id });
    }
    async clearAllSession() {
        return this.nguoiDungThietBiRepo.clear();
    }
    async clearSessionByNguoiDungId(nguoi_dung_id) {
        return this.nguoiDungThietBiRepo.delete({ nguoi_dung_id });
    }
    async updateFirebaseToken(nguoi_dung_id, firebase_token) {
        const existingToken = await this.nguoiDungThietBiRepo.findOneBy({
            nguoi_dung_id,
            firebase_token,
        });
        if (existingToken)
            return;
        const latestSession = await this.nguoiDungThietBiRepo.findOne({
            where: { nguoi_dung_id },
            order: { ngay_tao: 'DESC' },
        });
        if (latestSession) {
            await this.nguoiDungThietBiRepo.update({ id: latestSession.id }, { firebase_token });
        }
    }
};
SessionService = SessionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(nguoi_dung_thiet_bi_entity_1.NguoiDungThietBi)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SessionService);
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map