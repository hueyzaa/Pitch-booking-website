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
var RoleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const contanst_1 = require("../../configs/contanst");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const permission_config_1 = require("../../configs/permission.config");
const database_service_1 = require("../../database/database.service");
const nguoi_dung_entity_1 = require("../../database/entities/auth/nguoi-dung.entity");
const vai_tro_entity_1 = require("../../database/entities/auth/vai-tro.entity");
const typeorm_2 = require("typeorm");
const core_exception_1 = require("../exceptions/core.exception");
const _ = require("lodash");
let RoleService = RoleService_1 = class RoleService {
    constructor(rolesRepository, databaseService) {
        this.rolesRepository = rolesRepository;
        this.databaseService = databaseService;
        this.logger = new common_1.Logger(RoleService_1.name);
    }
    async create(createRoleDto) {
        const data = Object.assign({}, createRoleDto);
        if (data.phan_quyen && typeof data.phan_quyen === 'object') {
            data.phan_quyen = JSON.stringify(data.phan_quyen);
        }
        return this.rolesRepository.save(data);
    }
    findAll(filters) {
        return this.databaseService.findWithPagination(filters, this.rolesRepository
            .createQueryBuilder('vai_tro')
            .leftJoinAndMapOne('vai_tro.nguoi_tao', nguoi_dung_entity_1.NguoiDung, 'nguoi_dung', 'nguoi_dung.id = vai_tro.nguoi_tao')
            .andWhere('vai_tro.trang_thai = :trang_thai', {
            trang_thai: contanst_1.STATUS.ACTIVE,
        }), ['vai_tro.*', `nguoi_dung.ho_va_ten as nguoi_tao_ten_day_du`], []);
    }
    async findOne(id) {
        const role = await this.rolesRepository.findOneBy({
            id,
            trang_thai: contanst_1.STATUS.ACTIVE,
        });
        if (!role) {
            return null;
        }
        let permission_current = [];
        try {
            permission_current = JSON.parse(role.phan_quyen);
        }
        catch (e) {
            this.logger.error(`Lỗi parse phan_quyen role id ${id}`, e);
        }
        const permission_default = _.cloneDeep(permission_config_1.permissions);
        permission_default.forEach((perDefault) => {
            const perm_db = permission_current.find((perm) => perm.name == perDefault.name);
            if (perm_db) {
                Object.keys(perDefault.actions).forEach((key) => {
                    perDefault.actions[key] = perm_db.actions[key] || false;
                });
            }
        });
        return Object.assign(Object.assign({}, role), { phan_quyen: permission_default });
    }
    async update(id, updateRoleDto) {
        const data = Object.assign({}, updateRoleDto);
        if (data.phan_quyen && typeof data.phan_quyen === 'object') {
            data.phan_quyen = JSON.stringify(data.phan_quyen);
        }
        data.ngay_cap_nhat = new Date();
        await this.rolesRepository.update(id, data);
        return await this.rolesRepository.findOneBy({ id });
    }
    async remove(id) {
        if (id <= 3) {
            throw new core_exception_1.HttpCoreException('Không thể xoá vai trò mặc định', '400');
        }
        return this.rolesRepository.update(id, {
            trang_thai: contanst_1.STATUS.INACTIVE,
            ngay_cap_nhat: new Date(),
        });
    }
    async findForSelectOptions(filters) {
        filters.limit = -1;
        return this.databaseService.findWithPagination(filters, this.rolesRepository
            .createQueryBuilder('vai_tro')
            .andWhere('vai_tro.trang_thai = :trang_thai', {
            trang_thai: contanst_1.STATUS.ACTIVE,
        }), ['vai_tro.id as value', `vai_tro.ten_vai_tro as label`], []);
    }
};
RoleService = RoleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vai_tro_entity_1.VaiTro)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        database_service_1.DatabaseService])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map