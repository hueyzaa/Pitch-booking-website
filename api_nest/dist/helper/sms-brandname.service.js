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
var SmsBrandnameService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsBrandnameService = void 0;
const contanst_1 = require("../configs/contanst");
const globalConfig_service_1 = require("../core/globalconfig/globalConfig.service");
const axios_1 = require("@nestjs/axios");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let SmsBrandnameService = SmsBrandnameService_1 = class SmsBrandnameService {
    constructor(httpService, globalConfigService, configService, dataSource, cacheManager) {
        this.httpService = httpService;
        this.globalConfigService = globalConfigService;
        this.configService = configService;
        this.dataSource = dataSource;
        this.cacheManager = cacheManager;
        this.logger = new common_1.Logger(SmsBrandnameService_1.name);
        this.initialConnectToSMSBrandname();
    }
    async initialConnectToSMSBrandname() {
        const userName = await this.globalConfigService.getConfigByKeyCache('SMS_BRANDNAME_USER');
        const password = await this.globalConfigService.getConfigByKeyCache('SMS_BRANDNAME_PASSWORD');
        const brandName = await this.globalConfigService.getConfigByKeyCache('SMS_BRANDNAME_SENDER');
        try {
            const init = await this.processGetSid();
            this.logger.debug(`Initial connection to SMS Brandname: USERNAME: ${userName} >> PASSWORD: ${password} >> BRANDNAME: ${brandName}`);
        }
        catch (error) {
            this.logger.error(`Initial connection to SMS Brandname: USERNAME: ${userName} >> PASSWORD: ${password} >> BRANDNAME: ${brandName}`);
        }
    }
    async processGetSid() {
        const dataFromCache = await this.cacheManager.get(`SMS_BRANDNAME_SID`);
        if (dataFromCache) {
            return dataFromCache;
        }
        const userName = await this.globalConfigService.getConfigByKeyCache('SMS_BRANDNAME_USER');
        const password = await this.globalConfigService.getConfigByKeyCache('SMS_BRANDNAME_PASSWORD');
        const brandName = await this.globalConfigService.getConfigByKeyCache('SMS_BRANDNAME_SENDER');
        const getSID = await this.httpService.axiosRef.get(`https://smsbrandname.mobifone.vn/smsg/login.jsp?userName=${userName}&password=${password}&bindMode=${brandName}`);
        if (!getSID.data.sid) {
            throw new Error('Không lấy được SID đăng nhập');
        }
        await this.cacheManager.set(`SMS_BRANDNAME_SID`, getSID.data.sid);
        return getSID.data.sid;
    }
    async sendSmsBrandNameMobiFone(recipient, content) {
        const brandName = await this.globalConfigService.getConfigByKeyCache('SMS_BRANDNAME_SENDER');
        content = content.replace(/\s+/g, '+');
        this.logger.debug('@sendSmsBrandNameMobiFone ~ content: ' + JSON.stringify(content));
        try {
            const sid = await this.processGetSid();
            const sendSMS = await this.httpService.axiosRef.get(`https://smsbrandname.mobifone.vn/smsg/send.jsp?sid=${sid}&sender=${brandName}&recipient=${recipient}&content=${content}`);
            this.logger.debug(`@sendSmsBrandNameMobiFone ~ sendSMS: ${JSON.stringify(sendSMS.data)}`);
            if (sendSMS.data.status !== contanst_1.HTTP_CODE.OK) {
                throw new Error(sendSMS.data.message);
            }
            return sendSMS.data;
        }
        catch (error) {
            this.logger.error(`@sendSmsBrandNameMobiFone ~ sendSMS: ${JSON.stringify(error.response)}`);
            console.log(error.response.data);
        }
    }
};
SmsBrandnameService = SmsBrandnameService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectDataSource)()),
    __param(4, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [axios_1.HttpService,
        globalConfig_service_1.GlobalConfigService,
        config_1.ConfigService,
        typeorm_2.DataSource, Object])
], SmsBrandnameService);
exports.SmsBrandnameService = SmsBrandnameService;
//# sourceMappingURL=sms-brandname.service.js.map