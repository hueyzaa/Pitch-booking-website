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
var LoaiSanService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaiSanService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("../database/database.service");
const typeorm_2 = require("typeorm");
const loai_san_entity_1 = require("../database/entities/loai-san.entity");
const nguoi_dung_entity_1 = require("../database/entities/auth/nguoi-dung.entity");
let LoaiSanService = LoaiSanService_1 = class LoaiSanService {
    constructor(databaseService, loaiSanRepo, cacheManager, dataSource) {
        this.databaseService = databaseService;
        this.loaiSanRepo = loaiSanRepo;
        this.cacheManager = cacheManager;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(LoaiSanService_1.name);
    }
    create(createLoaiSanDto) {
        return this.loaiSanRepo.save(createLoaiSanDto);
    }
    findAllWithPagination(filters) {
        return this.databaseService.findWithPagination(filters, this.loaiSanRepo
            .createQueryBuilder('loai_san')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_tao', 'nguoi_tao.id = loai_san.nguoi_tao')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_cap_nhat', 'nguoi_cap_nhat.id = loai_san.nguoi_cap_nhat'), [
            'loai_san.id as id',
            'loai_san.ten_loai_san as ten_loai_san',
            'loai_san.ngay_tao as ngay_tao',
            'nguoi_tao.ho_va_ten as ten_nguoi_tao',
            'loai_san.ngay_cap_nhat as ngay_cap_nhat',
            'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
        ], []);
    }
    findAll(options) {
        return this.loaiSanRepo.find(options);
    }
    findOneById(id) {
        return this.loaiSanRepo.findOneBy({ id: id });
    }
    findOneBy(where) {
        return this.loaiSanRepo.findOneBy(where);
    }
    async update(id, updateLoaiSanDto) {
        await this.loaiSanRepo.update(id, updateLoaiSanDto);
        return await this.findOneById(id);
    }
    remove(id) {
        return this.deleteBy({ id });
    }
    removeBy(where) {
        return this.loaiSanRepo.update(where, {});
    }
    deleteBy(where) {
        return this.loaiSanRepo.delete(where);
    }
    async findForSelectOptions(filters) {
        filters.limit = -1;
        return this.databaseService.findWithPagination(filters, this.loaiSanRepo.createQueryBuilder('loai_san'), ['loai_san.id as value', 'loai_san.ten_loai_san as label'], []);
    }
};
LoaiSanService = LoaiSanService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(loai_san_entity_1.LoaiSan)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(3, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        typeorm_2.Repository, Object, typeorm_2.DataSource])
], LoaiSanService);
exports.LoaiSanService = LoaiSanService;
//# sourceMappingURL=loai-san.service.js.map