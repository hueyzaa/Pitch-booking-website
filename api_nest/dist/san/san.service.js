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
var SanService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("../database/database.service");
const typeorm_2 = require("typeorm");
const san_entity_1 = require("../database/entities/san.entity");
const loai_san_entity_1 = require("../database/entities/loai-san.entity");
const nguoi_dung_entity_1 = require("../database/entities/auth/nguoi-dung.entity");
let SanService = SanService_1 = class SanService {
    constructor(databaseService, sanRepo, cacheManager, dataSource) {
        this.databaseService = databaseService;
        this.sanRepo = sanRepo;
        this.cacheManager = cacheManager;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(SanService_1.name);
    }
    create(createSanDto) {
        return this.sanRepo.save(createSanDto);
    }
    findAllWithPagination(filters) {
        return this.databaseService.findWithPagination(filters, this.sanRepo
            .createQueryBuilder('san')
            .leftJoin(loai_san_entity_1.LoaiSan, 'loai_san', 'loai_san.id = san.id_loai_san')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_tao', 'nguoi_tao.id = san.nguoi_tao')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_cap_nhat', 'nguoi_cap_nhat.id = san.nguoi_cap_nhat'), [
            'san.id as id',
            'san.ten_san as ten_san',
            'san.id_loai_san as id_loai_san',
            'loai_san.ten_loai_san as ten_loai_san',
            'san.ngay_tao as ngay_tao',
            'nguoi_tao.ho_va_ten as ten_nguoi_tao',
            'san.ngay_cap_nhat as ngay_cap_nhat',
            'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
        ], []);
    }
    findAll(options) {
        return this.sanRepo.find(options);
    }
    findOneById(id) {
        return this.sanRepo.findOneBy({ id: id });
    }
    findOneBy(where) {
        return this.sanRepo.findOneBy(where);
    }
    async update(id, updateSanDto) {
        await this.sanRepo.update(id, updateSanDto);
        return await this.findOneById(id);
    }
    remove(id) {
        return this.deleteBy({ id });
    }
    removeBy(where) {
        return this.sanRepo.update(where, {});
    }
    deleteBy(where) {
        return this.sanRepo.delete(where);
    }
    async findForSelectOptions(filters) {
        filters.limit = -1;
        return this.databaseService.findWithPagination(filters, this.sanRepo.createQueryBuilder('san'), ['san.id as value', 'san.ten_san as label'], []);
    }
};
SanService = SanService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(san_entity_1.San)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(3, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        typeorm_2.Repository, Object, typeorm_2.DataSource])
], SanService);
exports.SanService = SanService;
//# sourceMappingURL=san.service.js.map