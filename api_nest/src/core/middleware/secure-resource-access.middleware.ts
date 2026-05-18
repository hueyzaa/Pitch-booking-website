import { CORE_COMMON_ERROR, HTTP_CODE } from '@configs/contanst';
import { UserService } from '@core/profile/profile.service';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { HelperService } from '../../helper/helper.service';
import { HttpCoreException } from '../exceptions/core.exception';
import { NguoiDungThietBi } from '@database/entities/auth/nguoi-dung-thiet-bi.entity';
import { Log } from '@database/entities/system/log.entity';
/**
 * Middleware để bảo vệ tài nguyên mà không cần token trong URL
 * Sử dụng hàm hash để tạo URL an toàn có thời hạn
 */
@Injectable()
export class SecureResourceAccessMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly helperService: HelperService,
    private readonly configService: ConfigService,

    @InjectRepository(NguoiDungThietBi)
    private readonly nguoiDungThietBiRepository: Repository<NguoiDungThietBi>,
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // Sử dụng URL hash có thời hạn

      const { userId, originalUrl, deviceId, timestamp, signature } = req.query;
      if (typeof userId !== 'string' || !userId) {
        throw new HttpCoreException(
          CORE_COMMON_ERROR.MISSING_TOKEN,
          HTTP_CODE.FORBIDDEN,
        );
      }
      const nguoiDungThietBi = await this.nguoiDungThietBiRepository.findOne({
        where: {
          nguoi_dung_id: parseInt(userId, 10),
          device_id: deviceId as string,
        },
      });
      if (!nguoiDungThietBi) {
        throw new HttpCoreException(
          CORE_COMMON_ERROR.NOT_FOUND_OR_INACTIVE,
          HTTP_CODE.FORBIDDEN,
        );
      }
      // Kiểm tra thời gian hết hạn (15 phút)
      const currentTime = Math.floor(Date.now() / 1000);
      const urlTime = parseInt(timestamp as string, 10);
      const image_token_expires_time = this.configService.get<string>(
        'env.image_token_expires_time',
      );
      console.log('image_token_expires_time', image_token_expires_time);

      if (currentTime - urlTime > parseInt(image_token_expires_time, 10) * 60) {
        throw new HttpCoreException(
          CORE_COMMON_ERROR.TOKEN_NOT_FOUND,
          HTTP_CODE.FORBIDDEN,
        );
      }

      // Tìm user từ userId
      const user = await this.userService.findOneById(parseInt(userId, 10));
      if (!user) {
        throw new HttpCoreException(
          CORE_COMMON_ERROR.NOT_FOUND_OR_INACTIVE,
          HTTP_CODE.FORBIDDEN,
        );
      }

      const expectedSignature = await this.helperService.generateSecureUrl({
        userId: nguoiDungThietBi.nguoi_dung_id.toString(),
        originalUrlBase64: originalUrl as string,
        token: nguoiDungThietBi.access_token,
        deviceId: nguoiDungThietBi.device_id,
        timestamp: timestamp as string,
      });

      if (expectedSignature.signature !== signature) {
        throw new HttpCoreException(
          CORE_COMMON_ERROR.INVALID_TOKEN,
          HTTP_CODE.FORBIDDEN,
        );
      }

      // Ghi log truy cập
      //   await this.logRepository.save({
      //     user_id: userId,
      //     device_id: req.headers['user-agent'] || 'unknown',
      //     method: req.method,
      //     request_url: req.url,
      //     request_query: JSON.stringify(req.query),
      //     request_param: JSON.stringify(req.params),
      //     request_header: JSON.stringify(req.headers),
      //     ngay_tao: new Date(),
      //   });

      //   // Thêm thông tin user và resourcePath vào request để các controller sử dụng
      req['user'] = user;
      //   req['resourcePath'] = resourcePath;

      next();
    } catch (error) {
      if (error instanceof HttpCoreException) {
        throw error;
      }
      throw new HttpCoreException(
        CORE_COMMON_ERROR.INVALID_TOKEN,
        HTTP_CODE.FORBIDDEN,
      );
    }
  }
}
