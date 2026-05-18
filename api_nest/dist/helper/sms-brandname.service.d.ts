import { GlobalConfigService } from '@core/globalconfig/globalConfig.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { DataSource } from 'typeorm';
import { SMSBrandNameSendSMS } from './interfaces/smsBrandname.Interface';
export declare class SmsBrandnameService {
    private readonly httpService;
    private readonly globalConfigService;
    private readonly configService;
    private readonly dataSource;
    private readonly cacheManager;
    private readonly logger;
    constructor(httpService: HttpService, globalConfigService: GlobalConfigService, configService: ConfigService, dataSource: DataSource, cacheManager: Cache);
    initialConnectToSMSBrandname(): Promise<void>;
    processGetSid(): Promise<string>;
    sendSmsBrandNameMobiFone(recipient: string, content: string): Promise<SMSBrandNameSendSMS>;
}
