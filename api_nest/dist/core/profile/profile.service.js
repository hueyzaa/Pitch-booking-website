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
exports.UserService = void 0;
const contanst_1 = require("../../configs/contanst");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const database_service_1 = require("../../database/database.service");
const nguoi_dung_entity_1 = require("../../database/entities/auth/nguoi-dung.entity");
const helper_service_1 = require("../../helper/helper.service");
const typeorm_2 = require("typeorm");
const core_exception_1 = require("../exceptions/core.exception");
let UserService = class UserService {
    constructor(databaseService, helperService, nguoiDungRepo) {
        this.databaseService = databaseService;
        this.helperService = helperService;
        this.nguoiDungRepo = nguoiDungRepo;
    }
    async updateAvatar(id, path) {
        await this.nguoiDungRepo.update({ id }, { avatar: path });
        return this.findOneById(id);
    }
    async findOneByUserName(taiKhoan) {
        const findUser = await this.nguoiDungRepo.findOne({
            where: [
                { tai_khoan: taiKhoan, trang_thai: contanst_1.STATUS.ACTIVE },
                { email: taiKhoan, trang_thai: contanst_1.STATUS.ACTIVE },
                { so_dien_thoai: taiKhoan, trang_thai: contanst_1.STATUS.ACTIVE },
            ],
            relations: { ma_vai_tro2: true },
        });
        if (!findUser) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.NOT_FOUND_OR_INACTIVE, contanst_1.HTTP_CODE.NOT_FOUND);
        }
        const user = Object.assign(Object.assign({}, findUser), { phan_quyen: findUser.ma_vai_tro2.phan_quyen, ten_vai_tro: findUser.ma_vai_tro2.ten_vai_tro });
        delete user.ma_vai_tro2;
        return user;
    }
    async findOneByUsernameOrEmailOrSDT(taiKhoan) {
        const findUser = await this.nguoiDungRepo.findOne({
            where: [
                { tai_khoan: taiKhoan, trang_thai: contanst_1.STATUS.ACTIVE },
                { email: taiKhoan, trang_thai: contanst_1.STATUS.ACTIVE },
                { so_dien_thoai: taiKhoan, trang_thai: contanst_1.STATUS.ACTIVE },
            ],
            relations: {
                ma_vai_tro2: true,
                nguoi_dung_vai_tros: {
                    vai_tro: true,
                },
            },
        });
        findUser.nguoi_dung_vai_tros = findUser.nguoi_dung_vai_tros.map((item) => {
            return Object.assign(Object.assign({}, item), { vai_tro: Object.assign(Object.assign({}, item.vai_tro), { phan_quyen: null }) });
        });
        if (!findUser) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.NOT_FOUND_OR_INACTIVE, contanst_1.HTTP_CODE.NOT_FOUND);
        }
        const createUser = Object.assign(Object.assign({}, findUser), { phan_quyen: findUser.ma_vai_tro2.phan_quyen, ten_vai_tro: findUser.ma_vai_tro2.ten_vai_tro });
        delete createUser.ma_vai_tro2;
        return createUser;
    }
    async findOneByEmail(email) {
        const findUser = await this.nguoiDungRepo.findOne({
            where: { email: email, trang_thai: contanst_1.STATUS.ACTIVE },
            relations: { ma_vai_tro2: true },
        });
        if (!findUser) {
            throw new Error(contanst_1.CORE_COMMON_ERROR.NOT_FOUND_OR_INACTIVE);
        }
        const createUser = Object.assign(Object.assign({}, findUser), { phan_quyen: findUser.ma_vai_tro2.phan_quyen, ten_vai_tro: findUser.ma_vai_tro2.ten_vai_tro });
        delete createUser.ma_vai_tro2;
        return createUser;
    }
    async changePassword(tai_khoan, payload) {
        const findUser = await this.findOneByUsernameOrEmailOrSDT(tai_khoan);
        if (!payload.is_first_change) {
            if (!payload.mat_khau_hien_tai) {
                throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.NOT_FOUND_CURRENT_PASSWORD, contanst_1.HTTP_CODE.UNAUTHORIZED);
            }
            const checkCurrentPass = await this.helperService.compareHashed(payload.mat_khau_hien_tai, findUser.mat_khau);
            if (!checkCurrentPass) {
                throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.NOT_CORRECT_CURRENT_PASSWORD, contanst_1.HTTP_CODE.UNPROCESSABLE_CONTENT);
            }
        }
        else {
            if (!findUser.need_change_password) {
                throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.PERMISSION_DENY, contanst_1.HTTP_CODE.UNAUTHORIZED);
            }
        }
        const enbcrypt_pass = await this.helperService.genHashedPassword(payload.mat_khau_moi);
        await this.nguoiDungRepo.update(findUser.id, {
            mat_khau: enbcrypt_pass,
            need_change_password: payload.is_first_change && 0,
            last_password_change: new Date(),
        });
        delete findUser.mat_khau;
        return contanst_1.CORE_COMMON_MESSAGE.CHANGE_PASSWORD_SUCCESS;
    }
    async updatePassword(user, payload) {
        const validEmail = await this.findOneByEmail(user.email);
        if (validEmail.email !== user.email) {
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.INVALID_EMAIL, contanst_1.HTTP_CODE.FORBIDDEN);
        }
        const newPass = await this.helperService.genHashedPassword(payload.mat_khau_moi);
        await this.updateNewPassword(validEmail.email, newPass);
        return contanst_1.CORE_COMMON_MESSAGE.RESET_PASSWORD_SUCCESS;
    }
    async findOneById(id) {
        const result = await this.nguoiDungRepo.findOneBy({
            id,
        });
        return result;
    }
    async update(id, updateSelfDto) {
        if (!updateSelfDto.ho_va_ten) {
            updateSelfDto.ho_va_ten = `${updateSelfDto.ho} ${updateSelfDto.ten}`;
        }
        if (updateSelfDto.ngay_sinh) {
            updateSelfDto.ngay_sinh = moment(updateSelfDto.ngay_sinh, 'YYYY-MM-DD').toDate();
        }
        try {
            await this.nguoiDungRepo.update(id, updateSelfDto);
            const user = await this.nguoiDungRepo.findOneBy({ id });
            return user;
        }
        catch (error) {
            if (new RegExp(contanst_1.DATABASE_GENERAL_ERROR.DUPLICATE_ENTRY).test(error.message)) {
                throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.DUPLICATE_ENTRY, contanst_1.HTTP_CODE.UNPROCESSABLE_CONTENT);
            }
            else
                throw new core_exception_1.HttpCoreException(`${contanst_1.CORE_COMMON_ERROR.UNKNOWN_ERROR} ${error.message}`, contanst_1.HTTP_CODE.INTERNAL_ERROR);
        }
    }
    async remove(id) {
        await this.nguoiDungRepo.update({ id: id }, { trang_thai: contanst_1.STATUS.INACTIVE });
        return contanst_1.CORE_COMMON_MESSAGE.DELETE_PASSWORD_SUCCESS;
    }
    async updateResetPassToken(tai_khoan, token) {
        return await this.nguoiDungRepo
            .createQueryBuilder()
            .update()
            .set({ reset_pass_token: token })
            .where('tai_khoan = :tai_khoan', { tai_khoan })
            .execute();
    }
    async updateNewPassword(email, newPass) {
        return await this.nguoiDungRepo
            .createQueryBuilder()
            .update()
            .set({
            mat_khau: newPass,
            last_password_change: new Date(),
            need_change_password: contanst_1.STATUS.INACTIVE,
        })
            .where('email = :email', { email })
            .execute();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(nguoi_dung_entity_1.NguoiDung)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        helper_service_1.HelperService,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=profile.service.js.map