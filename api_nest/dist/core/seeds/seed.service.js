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
var SeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const contanst_1 = require("../../configs/contanst");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const permission_config_1 = require("../../configs/permission.config");
const nguoi_dung_entity_1 = require("../../database/entities/auth/nguoi-dung.entity");
const vai_tro_entity_1 = require("../../database/entities/auth/vai-tro.entity");
const typeorm_2 = require("typeorm");
let SeedService = SeedService_1 = class SeedService {
    constructor(roleRepository, userRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(SeedService_1.name);
        this.seedRoles();
        this.seedUsers();
    }
    async seedRoles() {
        const rolesSeed = [
            {
                id: 1,
                ma_vai_tro: contanst_1.ROLE.ADMIN,
                ten_vai_tro: 'Admin',
                phan_quyen: JSON.stringify(permission_config_1.permissions),
                trang_thai: contanst_1.STATUS.ACTIVE,
                nguoi_tao: 1,
            },
            {
                id: 2,
                ma_vai_tro: contanst_1.ROLE.USER,
                ten_vai_tro: 'User',
                phan_quyen: JSON.stringify(permission_config_1.permissions),
                trang_thai: contanst_1.STATUS.ACTIVE,
                nguoi_tao: 1,
            },
        ];
        try {
            for (const element of rolesSeed) {
                try {
                    await this.roleRepository.save(element);
                }
                catch (error) {
                    if (!/Duplicate entry/.test(error.message)) {
                        this.logger.error(error.stack);
                    }
                }
            }
            this.logger.debug('@seedRoles > OK');
        }
        catch (error) {
            this.logger.error('@seedRoles > ' + error.stack);
        }
    }
    async seedUsers() {
        const enbcrypt_pass = await this.genHashedPassword('Abc@1234!');
        const seedUser = [
            {
                ho: 'Super',
                ten: 'Admin',
                ho_va_ten: 'Super Admin',
                ngay_sinh: new Date(),
                gioi_tinh: contanst_1.GENDER.MALE,
                dia_chi: 'Toà nhà MobiFone',
                tinh_id: 7210,
                huyen_id: 59489,
                xa_id: 1448569,
                tai_khoan: 'ADMIN',
                mat_khau: enbcrypt_pass,
                email: 'Admin@gmail.com',
                so_dien_thoai: '0939123456',
                ma_vai_tro: contanst_1.ROLE.ADMIN,
                nguoi_tao: 0,
                nguoi_cap_nhat: 0,
            },
            {
                ho: 'Nguoi',
                ten: 'Dung',
                ho_va_ten: 'Nguoi Dung',
                ngay_sinh: new Date(),
                gioi_tinh: contanst_1.GENDER.MALE,
                dia_chi: 'Toà nhà MobiFone',
                tinh_id: 7210,
                huyen_id: 59489,
                xa_id: 1448569,
                tai_khoan: 'USER',
                mat_khau: enbcrypt_pass,
                email: 'user@gmail.com',
                so_dien_thoai: '0939123456',
                ma_vai_tro: contanst_1.ROLE.USER,
                nguoi_tao: 0,
                nguoi_cap_nhat: 0,
            },
            {
                ho: 'Nguoi',
                ten: 'Dung 01',
                ho_va_ten: 'Nguoi Dung 01',
                ngay_sinh: new Date(),
                gioi_tinh: contanst_1.GENDER.MALE,
                dia_chi: 'Toà nhà MobiFone',
                tinh_id: 7210,
                huyen_id: 59489,
                xa_id: 1448569,
                tai_khoan: 'USER01',
                mat_khau: enbcrypt_pass,
                email: 'user01@gmail.com',
                so_dien_thoai: '0939123456',
                ma_vai_tro: contanst_1.ROLE.USER,
                nguoi_tao: 0,
                nguoi_cap_nhat: 0,
            },
        ];
        try {
            for (const element of seedUser) {
                try {
                    await this.userRepository.save(element);
                }
                catch (error) {
                    if (!/Duplicate entry/.test(error.message)) {
                        this.logger.error(error.stack);
                    }
                }
            }
            this.logger.debug('@seedUsers > OK');
        }
        catch (error) {
            this.logger.error('@seedUsers > ' + error.stack);
        }
    }
    async genHashedPassword(pass) {
        const enbcrypt_pass = await bcrypt.hash(pass, 12);
        return enbcrypt_pass;
    }
};
SeedService = SeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vai_tro_entity_1.VaiTro)),
    __param(1, (0, typeorm_1.InjectRepository)(nguoi_dung_entity_1.NguoiDung)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SeedService);
exports.SeedService = SeedService;
//# sourceMappingURL=seed.service.js.map