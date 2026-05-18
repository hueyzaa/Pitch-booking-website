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
var CauHinhChungService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CauHinhChungService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("../database/database.service");
const typeorm_2 = require("typeorm");
const globalConfig_service_1 = require("../core/globalconfig/globalConfig.service");
const core_exception_1 = require("../core/exceptions/core.exception");
const contanst_1 = require("../configs/contanst");
const cau_hinh_chung_entity_1 = require("../database/entities/system/cau-hinh-chung.entity");
let CauHinhChungService = CauHinhChungService_1 = class CauHinhChungService {
    constructor(databaseService, cauHinhChungRepo, globalConfigService, cacheManager, dataSource) {
        this.databaseService = databaseService;
        this.cauHinhChungRepo = cauHinhChungRepo;
        this.globalConfigService = globalConfigService;
        this.cacheManager = cacheManager;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(CauHinhChungService_1.name);
    }
    create(createCauHinhChungDto) {
        return this.cauHinhChungRepo.save(createCauHinhChungDto);
    }
    findAllWithPagination(filters) {
        return this.databaseService.findWithPagination(filters, this.cauHinhChungRepo.createQueryBuilder('cau_hinh_chung'), [], []);
    }
    findAll(options) {
        return this.cauHinhChungRepo.find(options);
    }
    findOneById(id) {
        return this.cauHinhChungRepo.findOneBy({ id: id });
    }
    findOneBy(where) {
        return this.cauHinhChungRepo.findOneBy(where);
    }
    async update(updateCauHinhChungDto, user) {
        await this.globalConfigService.updateConfigKey(updateCauHinhChungDto.key, updateCauHinhChungDto.value, user);
        return await this.findOneBy({ key: updateCauHinhChungDto.key });
    }
    async updateConfigs(updateConfigsDto, user) {
        const updatedResults = [];
        for (const config of updateConfigsDto) {
            const existingConfig = await this.cauHinhChungRepo.findOneBy({
                key: config.key,
            });
            if (!existingConfig) {
                throw new core_exception_1.HttpCoreException(`Không tìm thấy cấu hình với key: ${config.key}`, contanst_1.HTTP_CODE.NOT_FOUND);
            }
            if (existingConfig.value !== config.value) {
                await this.cauHinhChungRepo.update({ key: config.key }, {
                    value: config.value,
                    nguoi_cap_nhat: user.id,
                });
            }
            updatedResults.push({ key: config.key, value: config.value });
        }
        return updatedResults;
    }
    remove(id) {
        return this.deleteBy({ id });
    }
    removeBy(where) {
        return this.cauHinhChungRepo.update(where, {});
    }
    deleteBy(where) {
        return this.cauHinhChungRepo.delete(where);
    }
    async findForSelectOptions(filters) {
        filters.limit = -1;
        return this.databaseService.findWithPagination(filters, this.cauHinhChungRepo.createQueryBuilder(), ['id as value', `CONCAT(id) as label`], []);
    }
    async findSpecificConfigs() {
        const configs = await this.cauHinhChungRepo.find({
            where: {
                key: (0, typeorm_2.In)(contanst_1.keyConfig),
            },
        });
        if (!configs || configs.length === 0) {
            throw new core_exception_1.HttpCoreException('Không tìm thấy cấu hình', '404');
        }
        return configs;
    }
};
CauHinhChungService = CauHinhChungService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(cau_hinh_chung_entity_1.CauHinhChung)),
    __param(3, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(4, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        typeorm_2.Repository,
        globalConfig_service_1.GlobalConfigService, Object, typeorm_2.DataSource])
], CauHinhChungService);
exports.CauHinhChungService = CauHinhChungService;
//# sourceMappingURL=cau-hinh-chung.service.js.map