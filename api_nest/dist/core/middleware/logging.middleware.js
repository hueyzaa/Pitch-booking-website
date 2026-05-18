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
exports.LoggerMiddleware = void 0;
const auth_service_1 = require("../auth/auth.service");
const log_entity_1 = require("../../database/entities/system/log.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let LoggerMiddleware = class LoggerMiddleware {
    constructor(authService, logRepo) {
        this.authService = authService;
        this.logRepo = logRepo;
        this.loggingConfig = process.env.CORE_LOGGING || 0;
        this.getResponseLog = async (res, logId) => {
            const rawResponse = res.write;
            const rawResponseEnd = res.end;
            let chunkBuffers = [];
            let response;
            res.write = (...chunks) => {
                var _a;
                const resArgs = [];
                for (let i = 0; i < chunks.length; i++) {
                    if (chunks[i])
                        resArgs[i] = Buffer.from(chunks[i]);
                    if (!chunks[i]) {
                        res.once('drain', res.write);
                        --i;
                    }
                }
                if ((_a = Buffer.concat(resArgs)) === null || _a === void 0 ? void 0 : _a.length) {
                    chunkBuffers = [...chunkBuffers, ...resArgs];
                }
                return rawResponse.apply(res, resArgs);
            };
            res.end = (...chunks) => {
                var _a;
                const resArgs = [];
                for (let i = 0; i < chunks.length; i++) {
                    if (chunks[i])
                        resArgs[i] = Buffer.from(chunks[i]);
                }
                if ((_a = Buffer.concat(resArgs)) === null || _a === void 0 ? void 0 : _a.length) {
                    chunkBuffers = [...chunkBuffers, ...resArgs];
                }
                const body = Buffer.concat(chunkBuffers).toString('utf8');
                const responseLog = {
                    response: {
                        statusCode: res.statusCode,
                        body: body || {},
                        headers: res.getHeaders(),
                    },
                };
                if (+this.loggingConfig) {
                    this.logRepo
                        .update(logId, {
                        response_code: res.statusCode.toString(),
                        response_body: body,
                    })
                        .catch((error) => {
                        console.log(error);
                        return;
                    });
                }
                rawResponseEnd.apply(res, resArgs);
                response = responseLog;
                return responseLog;
            };
            return response;
        };
    }
    async use(req, res, next) {
        let userId = undefined;
        try {
            const token = (req.headers.authorization ||
                req.cookies['token'] ||
                '').replace('Bearer ', '');
            const signData = await this.authService.verifyToken(token);
            userId = signData.id;
        }
        catch (error) { }
        let logId = null;
        if (+this.loggingConfig) {
            logId = await this.logRepo
                .save({
                method: req.method,
                device_id: `${req.headers['device_id']}`,
                user_id: userId,
                request_url: req.originalUrl,
                request_param: JSON.stringify(req.params),
                request_query: JSON.stringify(req.query),
                request_header: JSON.stringify(req.headers),
                request_body: JSON.stringify(req.body),
                response_code: '',
                response_body: '',
            })
                .catch((error) => {
                console.log(error);
                return;
            });
        }
        this.getResponseLog(res, logId === null || logId === void 0 ? void 0 : logId.id);
        if (next) {
            next();
        }
    }
};
LoggerMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(log_entity_1.Log)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        typeorm_2.Repository])
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=logging.middleware.js.map