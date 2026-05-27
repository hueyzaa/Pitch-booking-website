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
var AllExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const core_exception_1 = require("../exceptions/core.exception");
const helper_service_1 = require("../../helper/helper.service");
const contanst_1 = require("../../configs/contanst");
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    constructor(httpAdapterHost, helperService) {
        this.httpAdapterHost = httpAdapterHost;
        this.helperService = helperService;
        this.logger = new common_1.Logger(AllExceptionsFilter_1.name);
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        switch (exception.constructor) {
            case core_exception_1.HttpCoreException: {
                const [message, code] = exception.message.split('||');
                return httpAdapter.reply(ctx.getResponse(), {
                    code: Number(code || 500),
                    status: false,
                    message: this.helperService.transformMessage(message),
                    data: null,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                }, common_1.HttpStatus.OK);
            }
            case common_1.HttpException: {
                const message = exception.message;
                let responseBody = exception.getResponse();
                if (!responseBody) {
                    responseBody = {
                        code: 500,
                        status: false,
                        message: this.helperService.transformMessage(message),
                        data: null,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                    };
                }
                return httpAdapter.reply(ctx.getResponse(), responseBody, common_1.HttpStatus.OK);
            }
            default: {
                const messageStr = (exception === null || exception === void 0 ? void 0 : exception.message) || '';
                let code = 500;
                if (messageStr.includes(contanst_1.DATABASE_GENERAL_ERROR.DUPLICATE_ENTRY) ||
                    messageStr.includes(contanst_1.DATABASE_GENERAL_ERROR.FOREIGN_KEY) ||
                    messageStr.includes(contanst_1.DATABASE_GENERAL_ERROR.NOT_NULL) ||
                    messageStr.includes(contanst_1.DATABASE_GENERAL_ERROR.DATA_TOO_LONG) ||
                    messageStr.includes(contanst_1.DATABASE_GENERAL_ERROR.ER_NO_REFERENCED_ROW_2) ||
                    messageStr.includes(contanst_1.DATABASE_GENERAL_ERROR.ER_WARN_DATA_OUT_OF_RANGE)) {
                    code = 400;
                }
                const responseBody = {
                    code: code,
                    status: false,
                    message: this.helperService.transformMessage(messageStr),
                    data: null,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                };
                return httpAdapter.reply(ctx.getResponse(), responseBody, common_1.HttpStatus.OK);
            }
        }
    }
};
AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost,
        helper_service_1.HelperService])
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=all-exception.filter.js.map