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
const tinh_entity_1 = require("../database/entities/common/tinh.entity");
const xa_entity_1 = require("../database/entities/common/xa.entity");
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
    async findAllWithPagination(filters) {
        const result = await this.databaseService.findWithPagination(filters, this.sanRepo
            .createQueryBuilder('san')
            .leftJoin(loai_san_entity_1.LoaiSan, 'loai_san', 'loai_san.id = san.id_loai_san')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_tao', 'nguoi_tao.id = san.nguoi_tao')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_cap_nhat', 'nguoi_cap_nhat.id = san.nguoi_cap_nhat')
            .leftJoin(tinh_entity_1.Tinh, 'tinh', 'tinh.id = san.tinh_id')
            .leftJoin(xa_entity_1.Xa, 'xa', 'xa.id = san.xa_id')
            .leftJoin('quan_ly_gia', 'q_gia', 'q_gia.id_san = san.id AND q_gia.trang_thai = 1 AND q_gia.id = (SELECT MAX(id) FROM quan_ly_gia WHERE id_san = san.id AND trang_thai = 1)')
            .leftJoin((qb) => qb
            .select('id_san')
            .addSelect('AVG(so_sao)', 'avg_rating')
            .addSelect('COUNT(id)', 'review_count')
            .from('danh_gia', 'dg')
            .where('trang_thai = 1')
            .groupBy('id_san'), 'danh_gia_stats', 'danh_gia_stats.id_san = san.id')
            .leftJoin((qb) => qb
            .select('id_san')
            .addSelect('COUNT(id)', 'booked_slots_today')
            .from('dat_san', 'ds')
            .where('ds.ngay_dat = CURDATE()')
            .andWhere('ds.trang_thai IN (0, 1)')
            .groupBy('id_san'), 'dat_san_stats', 'dat_san_stats.id_san = san.id'), [
            'san.id as id',
            'san.ten_san as ten_san',
            'san.id_loai_san as id_loai_san',
            'loai_san.ten_loai_san as ten_loai_san',
            'san.dia_chi as dia_chi',
            'san.tinh_id as tinh_id',
            'san.xa_id as xa_id',
            'tinh.name as ten_tinh',
            'xa.name as ten_xa',
            'san.tien_ich as tien_ich',
            'san.anh_chinh as anh_chinh',
            'san.anh_chi_tiet as anh_chi_tiet',
            'san.mo_ta as mo_ta',
            'san.ngay_tao as ngay_tao',
            'nguoi_tao.ho_va_ten as ten_nguoi_tao',
            'san.ngay_cap_nhat as ngay_cap_nhat',
            'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
            'COALESCE(q_gia.gia_theo_gio, 0) as pricePerHour',
            'COALESCE(danh_gia_stats.avg_rating, 0) as rating',
            'COALESCE(danh_gia_stats.review_count, 0) as reviewCount',
            'COALESCE(dat_san_stats.booked_slots_today, 0) as booked_slots_today',
        ], []);
        if (result.collection && Array.isArray(result.collection)) {
            result.collection = result.collection.map((san) => {
                if (san.tien_ich && typeof san.tien_ich === 'string') {
                    san.tien_ich = san.tien_ich.split(',').filter(Boolean);
                }
                if (san.anh_chi_tiet && typeof san.anh_chi_tiet === 'string') {
                    try {
                        san.anh_chi_tiet = JSON.parse(san.anh_chi_tiet);
                    }
                    catch (_a) {
                        san.anh_chi_tiet = san.anh_chi_tiet.split(',').filter(Boolean);
                    }
                }
                if (san.pricePerHour !== undefined) {
                    san.pricePerHour = Number(san.pricePerHour);
                }
                if (san.rating !== undefined) {
                    san.rating = parseFloat(Number(san.rating).toFixed(1));
                }
                if (san.reviewCount !== undefined) {
                    san.reviewCount = Number(san.reviewCount);
                }
                if (san.booked_slots_today !== undefined) {
                    san.booked_slots_today = Number(san.booked_slots_today);
                    san.status = san.booked_slots_today >= 16 ? 'sold_out' : 'available';
                }
                return san;
            });
        }
        return result;
    }
    findAll(options) {
        return this.sanRepo.find(options);
    }
    async findOneById(id) {
        const query = this.sanRepo
            .createQueryBuilder('san')
            .leftJoin(loai_san_entity_1.LoaiSan, 'loai_san', 'loai_san.id = san.id_loai_san')
            .leftJoin(tinh_entity_1.Tinh, 'tinh', 'tinh.id = san.tinh_id')
            .leftJoin(xa_entity_1.Xa, 'xa', 'xa.id = san.xa_id')
            .leftJoin('quan_ly_gia', 'q_gia', 'q_gia.id_san = san.id AND q_gia.trang_thai = 1 AND q_gia.id = (SELECT MAX(id) FROM quan_ly_gia WHERE id_san = san.id AND trang_thai = 1)')
            .select([
            'san.id as id',
            'san.ten_san as ten_san',
            'san.id_loai_san as id_loai_san',
            'loai_san.ten_loai_san as ten_loai_san',
            'san.dia_chi as dia_chi',
            'san.tinh_id as tinh_id',
            'san.xa_id as xa_id',
            'tinh.name as ten_tinh',
            'xa.name as ten_xa',
            'san.tien_ich as tien_ich',
            'san.anh_chinh as anh_chinh',
            'san.anh_chi_tiet as anh_chi_tiet',
            'san.mo_ta as mo_ta',
            'san.ngay_tao as ngay_tao',
            'COALESCE(q_gia.gia_theo_gio, 0) as pricePerHour',
        ])
            .where('san.id = :id', { id });
        const san = await query.getRawOne();
        if (!san)
            return null;
        if (san.tien_ich && typeof san.tien_ich === 'string') {
            san.tien_ich = san.tien_ich.split(',').filter(Boolean);
        }
        if (san.anh_chi_tiet && typeof san.anh_chi_tiet === 'string') {
            try {
                san.anh_chi_tiet = JSON.parse(san.anh_chi_tiet);
            }
            catch (_a) {
                san.anh_chi_tiet = san.anh_chi_tiet.split(',').filter(Boolean);
            }
        }
        if (san.pricePerHour !== undefined) {
            san.pricePerHour = Number(san.pricePerHour);
        }
        return san;
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