import { HTTP_CODE } from '@configs/contanst';
import { GlobalConfigService } from '@core/globalconfig/globalConfig.service';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { Cache } from 'cache-manager';
import { DataSource } from 'typeorm';
import {
  SMSBrandNameLogin,
  SMSBrandNameSendSMS,
} from './interfaces/smsBrandname.Interface';

@Injectable()
export class SmsBrandnameService {
  private readonly logger = new Logger(SmsBrandnameService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly globalConfigService: GlobalConfigService,
    private readonly configService: ConfigService,
    @InjectDataSource()
    private readonly dataSource: DataSource,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    this.initialConnectToSMSBrandname();
  }

  async initialConnectToSMSBrandname() {
    const userName = await this.globalConfigService.getConfigByKeyCache(
      'SMS_BRANDNAME_USER',
    );
    const password = await this.globalConfigService.getConfigByKeyCache(
      'SMS_BRANDNAME_PASSWORD',
    );
    const brandName = await this.globalConfigService.getConfigByKeyCache(
      'SMS_BRANDNAME_SENDER',
    );
    try {
      //? Nếu không có trong cache thì mình lấy mới

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const init = await this.processGetSid();
      this.logger.debug(
        `Initial connection to SMS Brandname: USERNAME: ${userName} >> PASSWORD: ${password} >> BRANDNAME: ${brandName}`,
      );
    } catch (error) {
      this.logger.error(
        `Initial connection to SMS Brandname: USERNAME: ${userName} >> PASSWORD: ${password} >> BRANDNAME: ${brandName}`,
      );
    }
  }

  async processGetSid(): Promise<string> {
    //TODO: Check Cache

    const dataFromCache: string = await this.cacheManager.get(
      `SMS_BRANDNAME_SID`,
    );
    if (dataFromCache) {
      return dataFromCache;
    }

    //? Nếu không có trong cache thì mình lấy mới

    const userName = await this.globalConfigService.getConfigByKeyCache(
      'SMS_BRANDNAME_USER',
    );
    const password = await this.globalConfigService.getConfigByKeyCache(
      'SMS_BRANDNAME_PASSWORD',
    );
    const brandName = await this.globalConfigService.getConfigByKeyCache(
      'SMS_BRANDNAME_SENDER',
    );

    const getSID: AxiosResponse<SMSBrandNameLogin> =
      await this.httpService.axiosRef.get(
        `https://smsbrandname.mobifone.vn/smsg/login.jsp?userName=${userName}&password=${password}&bindMode=${brandName}`,
      );
    if (!getSID.data.sid) {
      throw new Error('Không lấy được SID đăng nhập');
    }

    //TODO: Lấy thành công thì mình cache lại TTL 5 phút
    await this.cacheManager.set(`SMS_BRANDNAME_SID`, getSID.data.sid);
    return getSID.data.sid;
  }

  async sendSmsBrandNameMobiFone(recipient: string, content: string) {
    const brandName = await this.globalConfigService.getConfigByKeyCache(
      'SMS_BRANDNAME_SENDER',
    );
    content = content.replace(/\s+/g, '+');
    this.logger.debug(
      '@sendSmsBrandNameMobiFone ~ content: ' + JSON.stringify(content),
    );

    try {
      const sid = await this.processGetSid();

      const sendSMS: AxiosResponse<SMSBrandNameSendSMS> =
        await this.httpService.axiosRef.get(
          `https://smsbrandname.mobifone.vn/smsg/send.jsp?sid=${sid}&sender=${brandName}&recipient=${recipient}&content=${content}`,
        );

      this.logger.debug(
        `@sendSmsBrandNameMobiFone ~ sendSMS: ${JSON.stringify(sendSMS.data)}`,
      );

      if (sendSMS.data.status !== HTTP_CODE.OK) {
        throw new Error(sendSMS.data.message);
      }

      //TODO Thành công
      return sendSMS.data;
    } catch (error) {
      this.logger.error(
        `@sendSmsBrandNameMobiFone ~ sendSMS: ${JSON.stringify(
          error.response,
        )}`,
      );
      console.log(error.response.data);
    }
  }
}
