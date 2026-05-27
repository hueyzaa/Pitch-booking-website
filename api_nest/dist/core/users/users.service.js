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
exports.UsersService = void 0;
const contanst_1 = require("../../configs/contanst");
const core_exception_1 = require("../exceptions/core.exception");
const nguoi_dung_entity_1 = require("../../database/entities/auth/nguoi-dung.entity");
const vai_tro_entity_1 = require("../../database/entities/auth/vai-tro.entity");
const helper_service_1 = require("../../helper/helper.service");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("../../database/database.service");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const users_helpers_1 = require("./helpers/users.helpers");
const nguoi_dung_vai_tro_entity_1 = require("../../database/entities/auth/nguoi-dung-vai-tro.entity");
const typeorm_3 = require("typeorm");
let UsersService = class UsersService {
    constructor(dataSource, databaseService, helperService, nguoiDungVaiTroRepo, usersRepo, vaiTroRepo, cacheManager) {
        this.dataSource = dataSource;
        this.databaseService = databaseService;
        this.helperService = helperService;
        this.nguoiDungVaiTroRepo = nguoiDungVaiTroRepo;
        this.usersRepo = usersRepo;
        this.vaiTroRepo = vaiTroRepo;
        this.cacheManager = cacheManager;
    }
    async create(createUsersDto) {
        createUsersDto.ho_va_ten = (0, users_helpers_1.buildFullName)(createUsersDto.ho, createUsersDto.ten);
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const roles = await (0, users_helpers_1.validateMultipleRoles)(createUsersDto.vai_tro_ids, this.vaiTroRepo);
            createUsersDto.ma_vai_tro = roles[0].ma_vai_tro;
            const hashedPassword = await this.helperService.genHashedPassword(createUsersDto.mat_khau);
            createUsersDto.mat_khau = hashedPassword;
            const user = await queryRunner.manager.save(nguoi_dung_entity_1.NguoiDung, createUsersDto);
            const userRoleMappings = (0, users_helpers_1.createUserRoleMappings)(user.id, roles.map((r) => r.id));
            await queryRunner.manager.insert(nguoi_dung_vai_tro_entity_1.NguoiDungVaiTro, userRoleMappings);
            await queryRunner.commitTransaction();
            return user;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAllWithPagination(filters) {
        const queryBuilder = this.usersRepo
            .createQueryBuilder('users')
            .leftJoin('nguoi_dung_vai_tro', 'nguoi_dung_vai_tro', 'nguoi_dung_vai_tro.nguoi_dung_id = users.id')
            .leftJoin('vai_tro', 'vai_tro', 'vai_tro.id = nguoi_dung_vai_tro.vai_tro_id')
            .groupBy('users.id');
        const res = await this.databaseService.findWithPagination(filters, queryBuilder, [
            'users.*',
            'GROUP_CONCAT(DISTINCT vai_tro.ten_vai_tro SEPARATOR ", ") as danh_sach_vai_tro',
            'GROUP_CONCAT(DISTINCT vai_tro.id SEPARATOR ", ") as danh_sach_vai_tro_ids',
        ], []);
        res.collection = res.collection.map((user) => (0, users_helpers_1.sanitizeUserResponse)(user));
        return res;
    }
    findAll(options) {
        return this.usersRepo.find(options);
    }
    async findOneById(id) {
        const user = await this.usersRepo.findOneBy({ id: id });
        const vaiTros = await this.nguoiDungVaiTroRepo.find({
            where: { nguoi_dung_id: id },
        });
        const vai_tro_ids = vaiTros.map((vaiTro) => vaiTro.vai_tro_id);
        return Object.assign(Object.assign({}, user), { vai_tro_ids });
    }
    findOneBy(where) {
        return this.usersRepo.findOneBy(where);
    }
    async update(id, updateUsersDto) {
        updateUsersDto.ho_va_ten = (0, users_helpers_1.buildFullName)(updateUsersDto.ho, updateUsersDto.ten);
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const roles = await (0, users_helpers_1.validateMultipleRoles)(updateUsersDto.vai_tro_ids, this.vaiTroRepo);
            updateUsersDto.ma_vai_tro = roles[0].ma_vai_tro;
            await queryRunner.manager.delete(nguoi_dung_vai_tro_entity_1.NguoiDungVaiTro, {
                nguoi_dung_id: id,
            });
            const userRoleMappings = (0, users_helpers_1.createUserRoleMappings)(id, roles.map((r) => r.id));
            await queryRunner.manager.insert(nguoi_dung_vai_tro_entity_1.NguoiDungVaiTro, userRoleMappings);
            await queryRunner.manager.update(nguoi_dung_entity_1.NguoiDung, id, _.omit(updateUsersDto, ['vai_tro_ids']));
            await queryRunner.commitTransaction();
            return await this.findOneById(id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    remove(id) {
        return this.deleteBy({ id });
    }
    deleteBy(where) {
        return this.usersRepo.delete(where);
    }
    async findForSelectOptions(filters) {
        filters.limit = -1;
        return this.databaseService.findWithPagination(filters, this.usersRepo
            .createQueryBuilder()
            .andWhere('trang_thai = :trang_thai', {
            trang_thai: contanst_1.STATUS.ACTIVE,
        }), ['id as value', `CONCAT(ho_va_ten) as label`], []);
    }
    async updateNeedChangePassword(id) {
        await this.usersRepo.update(id, {
            need_change_password: 2,
        });
        return this.usersRepo.findOneBy({ id: id });
    }
    async updateOtpSecret(id, otp_secret) {
        await this.usersRepo.update(id, { otp_secret });
        return this.usersRepo.findOneBy({ id });
    }
    async updateIsOtpVerify(id, is_otp_verify) {
        await this.usersRepo.update(id, {
            is_otp_verify,
            last_otp_verified: new Date(),
        });
        return this.usersRepo.findOneBy({ id });
    }
    async changePassword(id, password) {
        const user = await this.usersRepo.findOneBy({ id });
        if (!user) {
            throw new core_exception_1.HttpCoreException('Người dùng không tồn tại', contanst_1.HTTP_CODE.BAD_REQUEST);
        }
        const hashedPassword = await this.helperService.genHashedPassword(password);
        await this.usersRepo.update(id, { mat_khau: hashedPassword });
        return this.usersRepo.findOneBy({ id });
    }
    async removeUsersFromRole(vai_tro_id, user_ids) {
        if (!vai_tro_id || !Array.isArray(user_ids) || user_ids.length === 0) {
            throw new core_exception_1.HttpCoreException('Thiếu vai_tro_id hoặc user_ids', contanst_1.HTTP_CODE.BAD_REQUEST);
        }
        await this.nguoiDungVaiTroRepo.delete({
            vai_tro_id,
            nguoi_dung_id: (0, typeorm_2.In)(user_ids),
        });
        return { success: true };
    }
    async addManyUsersToRole(vai_tro_id, user_ids) {
        if (!vai_tro_id || !Array.isArray(user_ids) || user_ids.length === 0) {
            throw new core_exception_1.HttpCoreException('Thiếu vai_tro_id hoặc user_ids', contanst_1.HTTP_CODE.BAD_REQUEST);
        }
        const existing = await this.nguoiDungVaiTroRepo.find({
            where: { vai_tro_id },
            select: ['nguoi_dung_id'],
        });
        const existingIds = existing.map((r) => r.nguoi_dung_id);
        const newUserIds = user_ids.filter((id) => !existingIds.includes(id));
        if (newUserIds.length === 0) {
            throw new core_exception_1.HttpCoreException('Không có người dùng mới để thêm', contanst_1.HTTP_CODE.BAD_REQUEST);
        }
        const records = (0, users_helpers_1.createUserRoleMappings)(vai_tro_id, newUserIds).map((mapping) => ({
            nguoi_dung_id: mapping.nguoi_dung_id,
            vai_tro_id: mapping.vai_tro_id,
        }));
        await this.nguoiDungVaiTroRepo.insert(records);
        return { success: true, added: newUserIds };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(nguoi_dung_vai_tro_entity_1.NguoiDungVaiTro)),
    __param(4, (0, typeorm_1.InjectRepository)(nguoi_dung_entity_1.NguoiDung)),
    __param(5, (0, typeorm_1.InjectRepository)(vai_tro_entity_1.VaiTro)),
    __param(6, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_3.DataSource,
        database_service_1.DatabaseService,
        helper_service_1.HelperService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository, Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map