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
var TrangThaiSanService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrangThaiSanService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("../database/database.service");
const typeorm_2 = require("typeorm");
const trang_thai_san_entity_1 = require("../database/entities/trang-thai-san.entity");
const nguoi_dung_entity_1 = require("../database/entities/auth/nguoi-dung.entity");
const san_entity_1 = require("../database/entities/san.entity");
let TrangThaiSanService = TrangThaiSanService_1 = class TrangThaiSanService {
    constructor(databaseService, trangThaiSanRepo, cacheManager, dataSource) {
        this.databaseService = databaseService;
        this.trangThaiSanRepo = trangThaiSanRepo;
        this.cacheManager = cacheManager;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(TrangThaiSanService_1.name);
    }
    create(createTrangThaiSanDto) {
        return this.trangThaiSanRepo.save(createTrangThaiSanDto);
    }
    findAllWithPagination(filters) {
        return this.databaseService.findWithPagination(filters, this.trangThaiSanRepo
            .createQueryBuilder('trang_thai_san')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_tao', 'nguoi_tao.id = trang_thai_san.nguoi_tao')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_cap_nhat', 'nguoi_cap_nhat.id = trang_thai_san.nguoi_cap_nhat')
            .leftJoin(san_entity_1.San, 'san', 'san.id = trang_thai_san.id_san'), [
            'trang_thai_san.id as id',
            'trang_thai_san.id_san as id_san',
            'san.ten_san as ten_san',
            'trang_thai_san.ngay as ngay',
            'trang_thai_san.gio_bat_dau as gio_bat_dau',
            'trang_thai_san.gio_ket_thuc as gio_ket_thuc',
            'trang_thai_san.trang_thai as trang_thai',
            'trang_thai_san.ghi_chu as ghi_chu',
            'trang_thai_san.ngay_tao as ngay_tao',
            'nguoi_tao.ho_va_ten as ten_nguoi_tao',
            'trang_thai_san.ngay_cap_nhat as ngay_cap_nhat',
            'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
        ], []);
    }
    findAll(options) {
        return this.trangThaiSanRepo.find(options);
    }
    findOneById(id) {
        return this.trangThaiSanRepo.findOneBy({ id: id });
    }
    findOneBy(where) {
        return this.trangThaiSanRepo.findOneBy(where);
    }
    async update(id, updateTrangThaiSanDto) {
        await this.trangThaiSanRepo.update(id, updateTrangThaiSanDto);
        return await this.findOneById(id);
    }
    remove(id) {
        return this.deleteBy({ id });
    }
    removeBy(where) {
        return this.trangThaiSanRepo.update(where, {});
    }
    deleteBy(where) {
        return this.trangThaiSanRepo.delete(where);
    }
    async findForSelectOptions(filters) {
        filters.limit = -1;
        return this.databaseService.findWithPagination(filters, this.trangThaiSanRepo
            .createQueryBuilder('trang_thai_san')
            .leftJoin(san_entity_1.San, 'san', 'san.id = trang_thai_san.id_san'), [
            'trang_thai_san.id as value',
            `CONCAT(san.ten_san, ' - ', trang_thai_san.ngay, ' (', trang_thai_san.gio_bat_dau, ' - ', trang_thai_san.gio_ket_thuc, ')') as label`,
        ], []);
    }
};
TrangThaiSanService = TrangThaiSanService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(trang_thai_san_entity_1.TrangThaiSan)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(3, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        typeorm_2.Repository, Object, typeorm_2.DataSource])
], TrangThaiSanService);
exports.TrangThaiSanService = TrangThaiSanService;
//# sourceMappingURL=trang-thai-san.service.js.map