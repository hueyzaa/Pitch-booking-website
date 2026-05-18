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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThongBaoService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("../database/database.service");
const typeorm_2 = require("typeorm");
const thong_bao_entity_1 = require("../database/entities/system/thong-bao.entity");
let ThongBaoService = class ThongBaoService {
    constructor(databaseService, thongBaoRepo, cacheManager) {
        this.databaseService = databaseService;
        this.thongBaoRepo = thongBaoRepo;
        this.cacheManager = cacheManager;
    }
    create(createThongBaoDto) {
        return this.thongBaoRepo.save(createThongBaoDto);
    }
    findAllWithPagination(filters) {
        return this.databaseService.findWithPagination(filters, this.thongBaoRepo.createQueryBuilder('thong_bao'), [], []);
    }
    findAll(options) {
        return this.thongBaoRepo.find(options);
    }
    findOneById(id) {
        return this.thongBaoRepo.findOneBy({ id: id });
    }
    findOneBy(where) {
        return this.thongBaoRepo.findOneBy(where);
    }
    async update(id, updateThongBaoDto) {
        await this.thongBaoRepo.update(id, updateThongBaoDto);
        return await this.findOneById(id);
    }
    remove(id) {
        return this.deleteBy({ id });
    }
    removeBy(where) {
        return this.thongBaoRepo.update(where, {});
    }
    deleteBy(where) {
        return this.thongBaoRepo.delete(where);
    }
    async bulkDelete(ids) {
        return this.thongBaoRepo.delete(ids);
    }
    async markAllRead(userId) {
        return this.thongBaoRepo.update({ nguoi_dung_id: userId, da_xem: 0 }, { da_xem: 1 });
    }
    async deleteAllByUserId(userId) {
        return this.thongBaoRepo.delete({ nguoi_dung_id: userId });
    }
    async findForSelectOptions(filters) {
        filters.limit = -1;
        return this.databaseService.findWithPagination(filters, this.thongBaoRepo.createQueryBuilder(), ['id as value', `CONCAT(id) as label`], []);
    }
};
ThongBaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(thong_bao_entity_1.ThongBao)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        typeorm_2.Repository, Object])
], ThongBaoService);
exports.ThongBaoService = ThongBaoService;
//# sourceMappingURL=thong-bao.service.js.map