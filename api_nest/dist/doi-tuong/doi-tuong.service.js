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
var DoiTuongService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoiTuongService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("../database/database.service");
const typeorm_2 = require("typeorm");
const doi_tuong_entity_1 = require("../database/entities/doi-tuong.entity");
const nguoi_dung_entity_1 = require("../database/entities/auth/nguoi-dung.entity");
let DoiTuongService = DoiTuongService_1 = class DoiTuongService {
    constructor(databaseService, doiTuongRepo, cacheManager, dataSource) {
        this.databaseService = databaseService;
        this.doiTuongRepo = doiTuongRepo;
        this.cacheManager = cacheManager;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(DoiTuongService_1.name);
    }
    create(createDoiTuongDto) {
        return this.doiTuongRepo.save(createDoiTuongDto);
    }
    findAllWithPagination(filters) {
        return this.databaseService.findWithPagination(filters, this.doiTuongRepo
            .createQueryBuilder('doi_tuong')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_tao', 'nguoi_tao.id = doi_tuong.nguoi_tao')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_cap_nhat', 'nguoi_cap_nhat.id = doi_tuong.nguoi_cap_nhat'), [
            'doi_tuong.id as id',
            'doi_tuong.ten_doi_tuong as ten_doi_tuong',
            'doi_tuong.phan_tram_giam_gia as phan_tram_giam_gia',
            'doi_tuong.ngay_tao as ngay_tao',
            'nguoi_tao.ho_va_ten as ten_nguoi_tao',
            'doi_tuong.ngay_cap_nhat as ngay_cap_nhat',
            'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
        ], []);
    }
    findAll(options) {
        return this.doiTuongRepo.find(options);
    }
    findOneById(id) {
        return this.doiTuongRepo.findOneBy({ id: id });
    }
    findOneBy(where) {
        return this.doiTuongRepo.findOneBy(where);
    }
    async update(id, updateDoiTuongDto) {
        await this.doiTuongRepo.update(id, updateDoiTuongDto);
        return await this.findOneById(id);
    }
    remove(id) {
        return this.deleteBy({ id });
    }
    removeBy(where) {
        return this.doiTuongRepo.update(where, {});
    }
    deleteBy(where) {
        return this.doiTuongRepo.delete(where);
    }
    async findForSelectOptions(filters) {
        filters.limit = -1;
        return this.databaseService.findWithPagination(filters, this.doiTuongRepo.createQueryBuilder('doi_tuong'), [
            'doi_tuong.id as value',
            'doi_tuong.ten_doi_tuong as label',
            'doi_tuong.phan_tram_giam_gia as phan_tram_giam_gia',
        ], []);
    }
};
DoiTuongService = DoiTuongService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(doi_tuong_entity_1.DoiTuong)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(3, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        typeorm_2.Repository, Object, typeorm_2.DataSource])
], DoiTuongService);
exports.DoiTuongService = DoiTuongService;
//# sourceMappingURL=doi-tuong.service.js.map