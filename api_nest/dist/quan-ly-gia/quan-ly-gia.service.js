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
var QuanLyGiaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuanLyGiaService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("../database/database.service");
const typeorm_2 = require("typeorm");
const quan_ly_gia_entity_1 = require("../database/entities/quan-ly-gia.entity");
const nguoi_dung_entity_1 = require("../database/entities/auth/nguoi-dung.entity");
const san_entity_1 = require("../database/entities/san.entity");
const doi_tuong_entity_1 = require("../database/entities/doi-tuong.entity");
let QuanLyGiaService = QuanLyGiaService_1 = class QuanLyGiaService {
    constructor(databaseService, quanLyGiaRepo, doiTuongRepo, cacheManager, dataSource) {
        this.databaseService = databaseService;
        this.quanLyGiaRepo = quanLyGiaRepo;
        this.doiTuongRepo = doiTuongRepo;
        this.cacheManager = cacheManager;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(QuanLyGiaService_1.name);
    }
    async create(createQuanLyGiaDto) {
        return this.quanLyGiaRepo.save(Object.assign(Object.assign({}, createQuanLyGiaDto), { don_gia: createQuanLyGiaDto.gia_theo_gio }));
    }
    findAllWithPagination(filters) {
        return this.databaseService.findWithPagination(filters, this.quanLyGiaRepo
            .createQueryBuilder('quan_ly_gia')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_tao', 'nguoi_tao.id = quan_ly_gia.nguoi_tao')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_cap_nhat', 'nguoi_cap_nhat.id = quan_ly_gia.nguoi_cap_nhat')
            .leftJoin(san_entity_1.San, 'san', 'san.id = quan_ly_gia.id_san'), [
            'quan_ly_gia.id as id',
            'quan_ly_gia.id_san as id_san',
            'san.ten_san as ten_san',
            'quan_ly_gia.gia_theo_gio as gia_theo_gio',
            'quan_ly_gia.don_gia as don_gia',
            'quan_ly_gia.ngay_bat_dau as ngay_bat_dau',
            'quan_ly_gia.ngay_ket_thuc as ngay_ket_thuc',
            'quan_ly_gia.trang_thai as trang_thai',
            'quan_ly_gia.ghi_chu as ghi_chu',
            'quan_ly_gia.ngay_tao as ngay_tao',
            'nguoi_tao.ho_va_ten as ten_nguoi_tao',
            'quan_ly_gia.ngay_cap_nhat as ngay_cap_nhat',
            'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
        ], []);
    }
    findAll(options) {
        return this.quanLyGiaRepo.find(options);
    }
    findOneById(id) {
        return this.quanLyGiaRepo.findOneBy({ id: id });
    }
    findOneBy(where) {
        return this.quanLyGiaRepo.findOneBy(where);
    }
    async update(id, updateQuanLyGiaDto) {
        await this.quanLyGiaRepo.update(id, Object.assign(Object.assign({}, updateQuanLyGiaDto), { don_gia: updateQuanLyGiaDto.gia_theo_gio }));
        return await this.findOneById(id);
    }
    remove(id) {
        return this.deleteBy({ id });
    }
    removeBy(where) {
        return this.quanLyGiaRepo.update(where, {});
    }
    deleteBy(where) {
        return this.quanLyGiaRepo.delete(where);
    }
    async findForSelectOptions(filters) {
        filters.limit = -1;
        return this.databaseService.findWithPagination(filters, this.quanLyGiaRepo
            .createQueryBuilder('quan_ly_gia')
            .leftJoin(san_entity_1.San, 'san', 'san.id = quan_ly_gia.id_san'), ['quan_ly_gia.id as value', 'san.ten_san as label'], []);
    }
    async findPriceBySan(id_san) {
        return this.quanLyGiaRepo.findOne({
            where: { id_san, trang_thai: 1 },
            order: { id: 'DESC' },
        });
    }
};
QuanLyGiaService = QuanLyGiaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(quan_ly_gia_entity_1.QuanLyGia)),
    __param(2, (0, typeorm_1.InjectRepository)(doi_tuong_entity_1.DoiTuong)),
    __param(3, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(4, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        typeorm_2.Repository,
        typeorm_2.Repository, Object, typeorm_2.DataSource])
], QuanLyGiaService);
exports.QuanLyGiaService = QuanLyGiaService;
//# sourceMappingURL=quan-ly-gia.service.js.map