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
var LogService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const log_entity_1 = require("../database/entities/system/log.entity");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("../database/database.service");
const typeorm_2 = require("typeorm");
let LogService = LogService_1 = class LogService {
    constructor(databaseService, logRepo, cacheManager, dataSource) {
        this.databaseService = databaseService;
        this.logRepo = logRepo;
        this.cacheManager = cacheManager;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(LogService_1.name);
    }
    findAllWithPagination(filters) {
        return this.databaseService.findWithPagination(filters, this.logRepo.createQueryBuilder('log'), [], []);
    }
    findAll(options) {
        return this.logRepo.find(options);
    }
    findOneById(id) {
        return this.logRepo.findOneBy({ id: id });
    }
};
LogService = LogService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(log_entity_1.Log)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(3, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        typeorm_2.Repository, Object, typeorm_2.DataSource])
], LogService);
exports.LogService = LogService;
//# sourceMappingURL=log.service.js.map