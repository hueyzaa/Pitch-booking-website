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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogMiddleware = void 0;
const log_thao_tac_service_1 = require("../../log-thao-tac/log-thao-tac.service");
const auth_service_1 = require("../auth/auth.service");
const common_1 = require("@nestjs/common");
const log_thao_tac_dto_1 = require("../../log-thao-tac/dto/log-thao-tac.dto");
let UserLogMiddleware = class UserLogMiddleware {
    constructor(authService, logThaoTacService) {
        this.authService = authService;
        this.logThaoTacService = logThaoTacService;
        this.loggingConfig = process.env.CORE_USER_ACTIVITY_LOG || 0;
    }
    async use(req, res, next) {
        let user;
        try {
            const token = (req.headers.authorization ||
                req.cookies['token'] ||
                '').replace('Bearer ', '');
            user = await this.authService.verifyToken(token);
        }
        catch (error) { }
        if (+this.loggingConfig && user) {
            const createLogThaoTacDto = new log_thao_tac_dto_1.CreateLogThaoTacDto();
            createLogThaoTacDto.user_id = user.id;
            createLogThaoTacDto.user_name = user.ho_va_ten;
            createLogThaoTacDto.url = req.originalUrl;
            createLogThaoTacDto.method = req.method;
            createLogThaoTacDto.body = req.body;
            createLogThaoTacDto.statusCode = res.statusCode.toString();
            await this.logThaoTacService.create(createLogThaoTacDto);
        }
        if (next) {
            next();
        }
    }
};
UserLogMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        log_thao_tac_service_1.LogThaoTacService])
], UserLogMiddleware);
exports.UserLogMiddleware = UserLogMiddleware;
//# sourceMappingURL=user-log.middleware.js.map