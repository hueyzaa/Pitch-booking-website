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
var ThuChiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThuChiService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("../database/database.service");
const typeorm_2 = require("typeorm");
const thu_chi_entity_1 = require("../database/entities/thu-chi.entity");
const nguoi_dung_entity_1 = require("../database/entities/auth/nguoi-dung.entity");
const san_entity_1 = require("../database/entities/san.entity");
const khach_hang_entity_1 = require("../database/entities/khach-hang.entity");
let ThuChiService = ThuChiService_1 = class ThuChiService {
    constructor(databaseService, thuChiRepo, cacheManager, dataSource) {
        this.databaseService = databaseService;
        this.thuChiRepo = thuChiRepo;
        this.cacheManager = cacheManager;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(ThuChiService_1.name);
    }
    create(createThuChiDto) {
        return this.thuChiRepo.save(createThuChiDto);
    }
    findAllWithPagination(filters) {
        return this.databaseService.findWithPagination(filters, this.thuChiRepo
            .createQueryBuilder('thu_chi')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_tao', 'nguoi_tao.id = thu_chi.nguoi_tao')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_cap_nhat', 'nguoi_cap_nhat.id = thu_chi.nguoi_cap_nhat')
            .leftJoin(khach_hang_entity_1.KhachHang, 'khach_hang', 'khach_hang.id = thu_chi.id_khach_hang')
            .leftJoin(san_entity_1.San, 'san', 'san.id = thu_chi.id_san'), [
            'thu_chi.id as id',
            'thu_chi.loai_giao_dich as loai_giao_dich',
            'thu_chi.danh_muc as danh_muc',
            'thu_chi.so_tien as so_tien',
            'thu_chi.ngay_giao_dich as ngay_giao_dich',
            'thu_chi.mo_ta as mo_ta',
            'thu_chi.id_khach_hang as id_khach_hang',
            'khach_hang.ho_va_ten as ten_khach_hang',
            'thu_chi.id_san as id_san',
            'san.ten_san as ten_san',
            'thu_chi.ghi_chu as ghi_chu',
            'thu_chi.ngay_tao as ngay_tao',
            'nguoi_tao.ho_va_ten as ten_nguoi_tao',
            'thu_chi.ngay_cap_nhat as ngay_cap_nhat',
            'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
        ], []);
    }
    findAll(options) {
        return this.thuChiRepo.find(options);
    }
    findOneById(id) {
        return this.thuChiRepo.findOneBy({ id: id });
    }
    findOneBy(where) {
        return this.thuChiRepo.findOneBy(where);
    }
    async update(id, updateThuChiDto) {
        await this.thuChiRepo.update(id, updateThuChiDto);
        return await this.findOneById(id);
    }
    remove(id) {
        return this.deleteBy({ id });
    }
    removeBy(where) {
        return this.thuChiRepo.update(where, {});
    }
    deleteBy(where) {
        return this.thuChiRepo.delete(where);
    }
    async findForSelectOptions(filters) {
        filters.limit = -1;
        return this.databaseService.findWithPagination(filters, this.thuChiRepo.createQueryBuilder('thu_chi'), [
            'id as value',
            `CONCAT(danh_muc, ' - ', IF(loai_giao_dich = 1, 'Thu', 'Chi'), ' - ', so_tien) as label`,
        ], []);
    }
};
ThuChiService = ThuChiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(thu_chi_entity_1.ThuChi)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(3, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        typeorm_2.Repository, Object, typeorm_2.DataSource])
], ThuChiService);
exports.ThuChiService = ThuChiService;
//# sourceMappingURL=thu-chi.service.js.map