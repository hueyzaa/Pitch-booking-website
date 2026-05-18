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
var GlobalConfigService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalConfigService = void 0;
const core_exception_1 = require("../exceptions/core.exception");
const cau_hinh_chung_entity_1 = require("../../database/entities/system/cau-hinh-chung.entity");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let GlobalConfigService = GlobalConfigService_1 = class GlobalConfigService {
    constructor(cauHinhChungRepo, cacheManager) {
        this.cauHinhChungRepo = cauHinhChungRepo;
        this.cacheManager = cacheManager;
        this.logger = new common_1.Logger(GlobalConfigService_1.name);
    }
    async getConfigByKey(key) {
        const result = await this.cauHinhChungRepo.findOneBy({ key });
        if (!result) {
            throw new Error(`Không tim thấy cấu hình cần tìm ${key}`);
        }
        return result;
    }
    async getConfigByKeyCache(key) {
        const dataFromCache = await this.cacheManager.get(`GLOBAL_CONFIG_${key}`);
        if (dataFromCache) {
            return dataFromCache;
        }
        const result = await this.cauHinhChungRepo.findOneBy({ key });
        if (!result) {
            throw new Error(`Không tim thấy cấu hình cần tìm ${key}`);
        }
        await this.cacheManager.set(`GLOBAL_CONFIG_${key}`, result.value);
        return result.value;
    }
    async getConfigsByKeysCache(keys) {
        const result = {};
        const notFoundKeys = [];
        for (const key of keys) {
            const dataFromCache = await this.cacheManager.get(`GLOBAL_CONFIG_${key}`);
            if (dataFromCache) {
                result[key.key] = dataFromCache;
            }
            else {
                notFoundKeys.push(key.key);
            }
        }
        if (notFoundKeys.length > 0) {
            const configs = await this.cauHinhChungRepo.find({
                where: { key: (0, typeorm_2.In)(notFoundKeys) },
            });
            for (const config of configs) {
                result[config.key] = config.value;
                await this.cacheManager.set(`GLOBAL_CONFIG_${config.key}`, config.value);
            }
        }
        for (const key of notFoundKeys) {
            result[key] = keys.find((k) => k.key === key).defaultValue;
        }
        return result;
    }
    async writeConfigToKey(key, value) {
        const result = await this.cauHinhChungRepo.insert({ key, value });
        return result;
    }
    async updateConfigKey(key, value, user) {
        const cauHinhChung = await this.cauHinhChungRepo.findOneBy({ key });
        if (!cauHinhChung) {
            throw new core_exception_1.HttpCoreException(`Không tim thấy cấu hình cần tìm ${key}`, '404');
        }
        return await this.cauHinhChungRepo.update({ key: key }, {
            value,
            nguoi_cap_nhat: user.id,
        });
    }
};
GlobalConfigService = GlobalConfigService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cau_hinh_chung_entity_1.CauHinhChung)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], GlobalConfigService);
exports.GlobalConfigService = GlobalConfigService;
//# sourceMappingURL=globalConfig.service.js.map