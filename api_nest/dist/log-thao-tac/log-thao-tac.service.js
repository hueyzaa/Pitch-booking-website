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
var LogThaoTacService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogThaoTacService = void 0;
const log_config_1 = require("./../configs/log.config");
const profile_service_1 = require("./../core/profile/profile.service");
const core_exception_1 = require("../core/exceptions/core.exception");
const log_config_2 = require("../configs/log.config");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("../database/database.service");
const typeorm_2 = require("typeorm");
const log_thao_tac_dto_1 = require("./dto/log-thao-tac.dto");
const log_config_3 = require("../configs/log.config");
const log_thao_tac_entity_1 = require("../database/entities/system/log-thao-tac.entity");
let LogThaoTacService = LogThaoTacService_1 = class LogThaoTacService {
    constructor(databaseService, userService, logThaoTacRepo, cacheManager, dataSource) {
        this.databaseService = databaseService;
        this.userService = userService;
        this.logThaoTacRepo = logThaoTacRepo;
        this.cacheManager = cacheManager;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(LogThaoTacService_1.name);
        this.checkRouteAndReturnResult = (url) => {
            for (const [entity, name] of Object.entries(log_config_2.entityMap)) {
                if (url.includes(`/${entity}`)) {
                    return name;
                }
            }
            return 'Khác';
        };
        this.convertMethod = (method) => {
            if (method === 'GET') {
                return 'Xem dữ liệu';
            }
            if (method === 'POST') {
                return 'Tạo mới dữ liệu';
            }
            if (method === 'PATCH') {
                return 'Cập nhật dữ liệu';
            }
            if (method === 'DELETE') {
                return 'Xóa dữ liệu';
            }
            return 'Khác';
        };
        this.convertSeverity = (originalUrl, method) => {
            for (const [severity, urlConfigs] of Object.entries(log_config_3.URL_SEVERITY_MAP)) {
                for (const config of urlConfigs) {
                    if (originalUrl.includes(config.url) &&
                        config.methods.includes(method)) {
                        return log_config_2.IMPACT_SEVERITY[severity];
                    }
                }
            }
            return log_config_2.IMPACT_SEVERITY.MUC_1;
        };
        this.convertType = (originalUrl) => {
            if (originalUrl.includes('/users')) {
                return log_config_2.LOG_CATEGORY.NHOM_4;
            }
            if (originalUrl.includes('/roles')) {
                return log_config_2.LOG_CATEGORY.NHOM_5;
            }
            return log_config_2.LOG_CATEGORY.NHOM_1;
        };
    }
    findAllWithPagination(filters) {
        return this.databaseService.findWithPagination(filters, this.logThaoTacRepo.createQueryBuilder('log_thao_tac'), [], []);
    }
    findAll(options) {
        return this.logThaoTacRepo.find(options);
    }
    async create(createLogThaoTacDto) {
        var _a, _b;
        let logCategoryName;
        if (createLogThaoTacDto.log_type) {
            logCategoryName = (_a = log_config_1.LOG_CATEGORY_DTO.find((i) => i.value === createLogThaoTacDto.log_type)) === null || _a === void 0 ? void 0 : _a.name;
        }
        let impactSeverityName;
        if (createLogThaoTacDto.severity) {
            impactSeverityName = (_b = log_config_1.IMPACT_SEVERITY_DTO.find((i) => i.value === createLogThaoTacDto.log_type)) === null || _b === void 0 ? void 0 : _b.name;
        }
        try {
            const newData = {
                user_id: createLogThaoTacDto.user_id,
                ho_ten: createLogThaoTacDto.user_name,
                url: createLogThaoTacDto.url,
                mo_ta_url: createLogThaoTacDto.url_description ||
                    this.checkRouteAndReturnResult(createLogThaoTacDto.url),
                mo_ta: createLogThaoTacDto.description ||
                    this.convertMethod(createLogThaoTacDto.method),
                phan_loai: logCategoryName || this.convertType(createLogThaoTacDto.url),
                muc_do: impactSeverityName ||
                    this.convertSeverity(createLogThaoTacDto.url, createLogThaoTacDto.method),
                noi_dung: JSON.stringify(createLogThaoTacDto.body),
                ket_qua: createLogThaoTacDto.statusCode,
            };
            return await this.logThaoTacRepo.save(newData);
        }
        catch (error) {
            throw new core_exception_1.HttpCoreException(error);
        }
    }
    async logLogin(user) {
        const createLogThaoTacDto = new log_thao_tac_dto_1.CreateLogThaoTacDto();
        createLogThaoTacDto.user_id = user.id;
        createLogThaoTacDto.user_name = user.ho_va_ten;
        createLogThaoTacDto.url = '/auth/login';
        createLogThaoTacDto.method = 'POST';
        createLogThaoTacDto.body = '';
        createLogThaoTacDto.description = 'Đăng nhập hệ thống';
        createLogThaoTacDto.log_type = 2;
        createLogThaoTacDto.statusCode = '200';
        return await this.create(createLogThaoTacDto);
    }
    async logLogout(userID) {
        const user = await this.userService.findOneById(userID);
        const createLogThaoTacDto = new log_thao_tac_dto_1.CreateLogThaoTacDto();
        createLogThaoTacDto.user_id = user.id;
        createLogThaoTacDto.user_name = user.ho_va_ten;
        createLogThaoTacDto.url = '/auth/logout';
        createLogThaoTacDto.method = 'POST';
        createLogThaoTacDto.body = '';
        createLogThaoTacDto.description = 'Đăng xuất hệ thống';
        createLogThaoTacDto.log_type = 2;
        createLogThaoTacDto.statusCode = '200';
        return await this.create(createLogThaoTacDto);
    }
    async logForgotPassword(data) {
        const createLogThaoTacDto = new log_thao_tac_dto_1.CreateLogThaoTacDto();
        createLogThaoTacDto.user_id = 0;
        createLogThaoTacDto.user_name = '';
        createLogThaoTacDto.url = '/auth/forgot-password';
        createLogThaoTacDto.method = 'POST';
        createLogThaoTacDto.body = JSON.stringify(data);
        createLogThaoTacDto.description = 'Yêu cầu gửi mail đổi mật khẩu';
        createLogThaoTacDto.log_type = 4;
        createLogThaoTacDto.statusCode = '200';
        return await this.create(createLogThaoTacDto);
    }
};
LogThaoTacService = LogThaoTacService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(log_thao_tac_entity_1.LogThaoTac)),
    __param(3, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(4, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        profile_service_1.UserService,
        typeorm_2.Repository, Object, typeorm_2.DataSource])
], LogThaoTacService);
exports.LogThaoTacService = LogThaoTacService;
//# sourceMappingURL=log-thao-tac.service.js.map