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
var BangGiaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BangGiaService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("../database/database.service");
const typeorm_2 = require("typeorm");
const bang_gia_entity_1 = require("../database/entities/bang-gia.entity");
const nguoi_dung_entity_1 = require("../database/entities/auth/nguoi-dung.entity");
const loai_san_entity_1 = require("../database/entities/loai-san.entity");
const doi_tuong_entity_1 = require("../database/entities/doi-tuong.entity");
let BangGiaService = BangGiaService_1 = class BangGiaService {
    constructor(databaseService, bangGiaRepo, cacheManager, dataSource) {
        this.databaseService = databaseService;
        this.bangGiaRepo = bangGiaRepo;
        this.cacheManager = cacheManager;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(BangGiaService_1.name);
    }
    create(createBangGiaDto) {
        return this.bangGiaRepo.save(createBangGiaDto);
    }
    findAllWithPagination(filters) {
        return this.databaseService.findWithPagination(filters, this.bangGiaRepo
            .createQueryBuilder('bang_gia')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_tao', 'nguoi_tao.id = bang_gia.nguoi_tao')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_cap_nhat', 'nguoi_cap_nhat.id = bang_gia.nguoi_cap_nhat')
            .leftJoin(loai_san_entity_1.LoaiSan, 'loai_san', 'loai_san.id = bang_gia.id_loai_san')
            .leftJoin(doi_tuong_entity_1.DoiTuong, 'doi_tuong', 'doi_tuong.id = bang_gia.id_doi_tuong'), [
            'bang_gia.id as id',
            'bang_gia.ten_bang_gia as ten_bang_gia',
            'bang_gia.don_gia as don_gia',
            'bang_gia.gio_bat_dau as gio_bat_dau',
            'bang_gia.gio_ket_thuc as gio_ket_thuc',
            'bang_gia.id_loai_san as id_loai_san',
            'loai_san.ten_loai_san as ten_loai_san',
            'bang_gia.id_doi_tuong as id_doi_tuong',
            'doi_tuong.ten_doi_tuong as ten_doi_tuong',
            'bang_gia.ngay_tao as ngay_tao',
            'nguoi_tao.ho_va_ten as ten_nguoi_tao',
            'bang_gia.ngay_cap_nhat as ngay_cap_nhat',
            'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
        ], []);
    }
    findAll(options) {
        return this.bangGiaRepo.find(options);
    }
    findOneById(id) {
        return this.bangGiaRepo.findOneBy({ id: id });
    }
    findOneBy(where) {
        return this.bangGiaRepo.findOneBy(where);
    }
    async update(id, updateBangGiaDto) {
        await this.bangGiaRepo.update(id, updateBangGiaDto);
        return await this.findOneById(id);
    }
    remove(id) {
        return this.deleteBy({ id });
    }
    removeBy(where) {
        return this.bangGiaRepo.update(where, {});
    }
    deleteBy(where) {
        return this.bangGiaRepo.delete(where);
    }
    async findForSelectOptions(filters) {
        filters.limit = -1;
        return this.databaseService.findWithPagination(filters, this.bangGiaRepo.createQueryBuilder('bang_gia'), ['bang_gia.id as value', 'bang_gia.ten_bang_gia as label'], []);
    }
};
BangGiaService = BangGiaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(bang_gia_entity_1.BangGia)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(3, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        typeorm_2.Repository, Object, typeorm_2.DataSource])
], BangGiaService);
exports.BangGiaService = BangGiaService;
//# sourceMappingURL=bang-gia.service.js.map