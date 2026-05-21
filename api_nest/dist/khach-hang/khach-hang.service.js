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
var KhachHangService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KhachHangService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("../database/database.service");
const typeorm_2 = require("typeorm");
const khach_hang_entity_1 = require("../database/entities/khach-hang.entity");
const nguoi_dung_entity_1 = require("../database/entities/auth/nguoi-dung.entity");
const doi_tuong_entity_1 = require("../database/entities/doi-tuong.entity");
let KhachHangService = KhachHangService_1 = class KhachHangService {
    constructor(databaseService, khachHangRepo, cacheManager, dataSource) {
        this.databaseService = databaseService;
        this.khachHangRepo = khachHangRepo;
        this.cacheManager = cacheManager;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(KhachHangService_1.name);
    }
    create(createKhachHangDto) {
        return this.khachHangRepo.save(createKhachHangDto);
    }
    findAllWithPagination(filters) {
        return this.databaseService.findWithPagination(filters, this.khachHangRepo
            .createQueryBuilder('khach_hang')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_tao', 'nguoi_tao.id = khach_hang.nguoi_tao')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_cap_nhat', 'nguoi_cap_nhat.id = khach_hang.nguoi_cap_nhat')
            .leftJoin(doi_tuong_entity_1.DoiTuong, 'doi_tuong', 'doi_tuong.id = khach_hang.id_doi_tuong'), [
            'khach_hang.id as id',
            'khach_hang.ho_va_ten as ho_va_ten',
            'khach_hang.so_dien_thoai as so_dien_thoai',
            'khach_hang.email as email',
            'khach_hang.dia_chi as dia_chi',
            'khach_hang.ngay_sinh as ngay_sinh',
            'khach_hang.gioi_tinh as gioi_tinh',
            'khach_hang.id_doi_tuong as id_doi_tuong',
            'doi_tuong.ten_doi_tuong as ten_doi_tuong',
            'khach_hang.ngay_tao as ngay_tao',
            'nguoi_tao.ho_va_ten as ten_nguoi_tao',
            'khach_hang.ngay_cap_nhat as ngay_cap_nhat',
            'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
        ], []);
    }
    findAll(options) {
        return this.khachHangRepo.find(options);
    }
    findOneById(id) {
        return this.khachHangRepo.findOneBy({ id: id });
    }
    findOneBy(where) {
        return this.khachHangRepo.findOneBy(where);
    }
    async update(id, updateKhachHangDto) {
        await this.khachHangRepo.update(id, updateKhachHangDto);
        return await this.findOneById(id);
    }
    remove(id) {
        return this.deleteBy({ id });
    }
    removeBy(where) {
        return this.khachHangRepo.update(where, {});
    }
    deleteBy(where) {
        return this.khachHangRepo.delete(where);
    }
    async findForSelectOptions(filters) {
        filters.limit = -1;
        return this.databaseService.findWithPagination(filters, this.khachHangRepo
            .createQueryBuilder('khach_hang')
            .leftJoin(doi_tuong_entity_1.DoiTuong, 'doi_tuong', 'doi_tuong.id = khach_hang.id_doi_tuong'), [
            'khach_hang.id as value',
            'khach_hang.ho_va_ten as label',
            'khach_hang.id_doi_tuong as id_doi_tuong',
            'doi_tuong.phan_tram_giam_gia as phan_tram_giam_gia',
        ], []);
    }
};
KhachHangService = KhachHangService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(khach_hang_entity_1.KhachHang)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(3, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        typeorm_2.Repository, Object, typeorm_2.DataSource])
], KhachHangService);
exports.KhachHangService = KhachHangService;
//# sourceMappingURL=khach-hang.service.js.map