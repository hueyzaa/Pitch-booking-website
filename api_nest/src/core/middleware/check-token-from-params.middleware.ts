import { AuthService } from '@core/auth/auth.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { HttpCoreException } from '../exceptions/core.exception';
import { CORE_COMMON_ERROR, HTTP_CODE } from '@configs/contanst';

@Injectable()
export class CheckTokenAndDeviceIdFromParamsMiddleware
  implements NestMiddleware
{
  constructor(private readonly authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // Lấy token từ query hoặc param
    const deviceId = req.query.device_id || req.params.device_id;
    if (typeof deviceId !== 'string' || !deviceId) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.MISSING_DEVICE_ID,
        HTTP_CODE.FORBIDDEN,
      );
    }
    const token = req.query.token || req.params.token;
    if (typeof token !== 'string' || !token) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.MISSING_TOKEN,
        HTTP_CODE.FORBIDDEN,
      );
    }
    try {
      const user = await this.authService.verifyToken(token);
      req['user'] = user;
      next();
    } catch (error) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.INVALID_TOKEN,
        HTTP_CODE.FORBIDDEN,
      );
    }
  }
}
