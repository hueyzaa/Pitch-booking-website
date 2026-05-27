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
var DanhGiaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DanhGiaService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("../database/database.service");
const typeorm_2 = require("typeorm");
const danh_gia_entity_1 = require("../database/entities/danh-gia.entity");
const nguoi_dung_entity_1 = require("../database/entities/auth/nguoi-dung.entity");
const san_entity_1 = require("../database/entities/san.entity");
const core_exception_1 = require("../core/exceptions/core.exception");
let DanhGiaService = DanhGiaService_1 = class DanhGiaService {
    constructor(databaseService, danhGiaRepo, nguoiDungRepo, cacheManager, dataSource) {
        this.databaseService = databaseService;
        this.danhGiaRepo = danhGiaRepo;
        this.nguoiDungRepo = nguoiDungRepo;
        this.cacheManager = cacheManager;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(DanhGiaService_1.name);
    }
    create(createDanhGiaDto) {
        return this.danhGiaRepo.save(createDanhGiaDto);
    }
    findAllWithPagination(filters) {
        return this.databaseService.findWithPagination(filters, this.danhGiaRepo
            .createQueryBuilder('danh_gia')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_dung', 'nguoi_dung.id = danh_gia.id_nguoi_dung')
            .leftJoin(san_entity_1.San, 'san', 'san.id = danh_gia.id_san')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_tao', 'nguoi_tao.id = danh_gia.nguoi_tao')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_cap_nhat', 'nguoi_cap_nhat.id = danh_gia.nguoi_cap_nhat'), [
            'danh_gia.id as id',
            'danh_gia.id_nguoi_dung as id_nguoi_dung',
            'nguoi_dung.ho_va_ten as ten_khach_hang',
            'nguoi_dung.so_dien_thoai as so_dien_thoai_khach_hang',
            'danh_gia.id_san as id_san',
            'san.ten_san as ten_san',
            'danh_gia.so_sao as so_sao',
            'danh_gia.noi_dung as noi_dung',
            'danh_gia.trang_thai as trang_thai',
            'danh_gia.ngay_tao as ngay_tao',
            'nguoi_tao.ho_va_ten as ten_nguoi_tao',
            'danh_gia.ngay_cap_nhat as ngay_cap_nhat',
            'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
        ], []);
    }
    findAll(options) {
        return this.danhGiaRepo.find(options);
    }
    findOneById(id) {
        return this.danhGiaRepo.findOne({
            where: { id },
            relations: ['nguoi_dung', 'san'],
        });
    }
    findOneBy(where) {
        return this.danhGiaRepo.findOneBy(where);
    }
    async update(id, updateDanhGiaDto) {
        await this.danhGiaRepo.update(id, updateDanhGiaDto);
        return await this.findOneById(id);
    }
    remove(id) {
        return this.deleteBy({ id });
    }
    removeBy(where) {
        return this.danhGiaRepo.update(where, {});
    }
    deleteBy(where) {
        return this.danhGiaRepo.delete(where);
    }
    async findForSelectOptions(filters) {
        filters.limit = -1;
        return this.databaseService.findWithPagination(filters, this.danhGiaRepo
            .createQueryBuilder('danh_gia')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_dung', 'nguoi_dung.id = danh_gia.id_nguoi_dung')
            .leftJoin(san_entity_1.San, 'san', 'san.id = danh_gia.id_san'), [
            'danh_gia.id as value',
            `CONCAT(nguoi_dung.ho_va_ten, ' - ', san.ten_san, ' (', danh_gia.so_sao, ' sao)') as label`,
        ], []);
    }
    async getLatestPublicReviews(limit = 6) {
        return this.danhGiaRepo
            .createQueryBuilder('danh_gia')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_dung', 'nguoi_dung.id = danh_gia.id_nguoi_dung')
            .leftJoin(san_entity_1.San, 'san', 'san.id = danh_gia.id_san')
            .select([
            'danh_gia.id as id',
            'nguoi_dung.ho_va_ten as ten_khach_hang',
            'nguoi_dung.anh_dai_dien as anh_dai_dien',
            'san.ten_san as ten_san',
            'danh_gia.so_sao as so_sao',
            'danh_gia.noi_dung as noi_dung',
            'danh_gia.ngay_tao as ngay_tao',
        ])
            .where('danh_gia.trang_thai = :trangThai', { trangThai: 1 })
            .orderBy('danh_gia.ngay_tao', 'DESC')
            .limit(limit)
            .getRawMany();
    }
    async findBySanId(idSan, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [reviews, total] = await this.danhGiaRepo
            .createQueryBuilder('danh_gia')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_dung', 'nguoi_dung.id = danh_gia.id_nguoi_dung')
            .select([
            'danh_gia.id as id',
            'nguoi_dung.ho_va_ten as ten_khach_hang',
            'danh_gia.so_sao as so_sao',
            'danh_gia.noi_dung as noi_dung',
            'danh_gia.ngay_tao as ngay_tao',
        ])
            .where('danh_gia.id_san = :idSan', { idSan })
            .andWhere('danh_gia.trang_thai = :trangThai', { trangThai: 1 })
            .orderBy('danh_gia.ngay_tao', 'DESC')
            .offset(skip)
            .limit(limit)
            .getRawMany()
            .then(async (data) => {
            const count = await this.danhGiaRepo
                .createQueryBuilder('danh_gia')
                .where('danh_gia.id_san = :idSan', { idSan })
                .andWhere('danh_gia.trang_thai = :trangThai', { trangThai: 1 })
                .getCount();
            return [data, count];
        });
        return {
            collection: reviews,
            total,
            page,
            limit,
        };
    }
    async getSummaryBySanId(idSan) {
        const result = await this.danhGiaRepo
            .createQueryBuilder('danh_gia')
            .select([
            'AVG(danh_gia.so_sao) as avg_rating',
            'COUNT(danh_gia.id) as total_reviews',
        ])
            .where('danh_gia.id_san = :idSan', { idSan })
            .andWhere('danh_gia.trang_thai = :trangThai', { trangThai: 1 })
            .getRawOne();
        return {
            avg_rating: (result === null || result === void 0 ? void 0 : result.avg_rating)
                ? parseFloat(parseFloat(result.avg_rating).toFixed(1))
                : 0,
            total_reviews: parseInt((result === null || result === void 0 ? void 0 : result.total_reviews) || '0', 10),
        };
    }
    async publicCreate(dto) {
        const nguoiDung = await this.nguoiDungRepo.findOneBy({
            tai_khoan: dto.tai_khoan,
        });
        if (!nguoiDung) {
            throw new core_exception_1.HttpCoreException('Không tìm thấy thông tin khách hàng. Vui lòng liên hệ quản trị viên.', '400');
        }
        const sanExists = await this.dataSource
            .getRepository(san_entity_1.San)
            .findOneBy({ id: dto.id_san });
        if (!sanExists) {
            throw new core_exception_1.HttpCoreException('Sân không tồn tại', '400');
        }
        const danhGia = this.danhGiaRepo.create({
            id_nguoi_dung: nguoiDung.id,
            id_san: dto.id_san,
            so_sao: dto.so_sao,
            noi_dung: dto.noi_dung || null,
            trang_thai: 1,
        });
        return this.danhGiaRepo.save(danhGia);
    }
    async getLatestGoodReviews(limit = 10) {
        return this.danhGiaRepo
            .createQueryBuilder('danh_gia')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_dung', 'nguoi_dung.id = danh_gia.id_nguoi_dung')
            .select([
            'danh_gia.id as id',
            'nguoi_dung.ho_va_ten as name',
            'danh_gia.so_sao as rating',
            'danh_gia.noi_dung as quote',
            'danh_gia.ngay_tao as ngay_tao',
        ])
            .where('danh_gia.so_sao >= :minStars', { minStars: 4 })
            .andWhere('danh_gia.trang_thai = :trangThai', { trangThai: 1 })
            .andWhere('danh_gia.noi_dung IS NOT NULL')
            .orderBy('danh_gia.ngay_tao', 'DESC')
            .limit(limit)
            .getRawMany();
    }
};
DanhGiaService = DanhGiaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(danh_gia_entity_1.DanhGia)),
    __param(2, (0, typeorm_1.InjectRepository)(nguoi_dung_entity_1.NguoiDung)),
    __param(3, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(4, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        typeorm_2.Repository,
        typeorm_2.Repository, Object, typeorm_2.DataSource])
], DanhGiaService);
exports.DanhGiaService = DanhGiaService;
//# sourceMappingURL=danh-gia.service.js.map