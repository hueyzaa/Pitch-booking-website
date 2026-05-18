import { CORE_COMMON_ERROR, HTTP_CODE } from '@configs/contanst';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { HttpCoreException } from '../exceptions/core.exception';

@Injectable()
export class HeaderCheckerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { device_id } = req.headers;

    if (!device_id) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.NOT_DETECT_DEVICE,
        HTTP_CODE.FORBIDDEN,
      );
    }
    req['device_id'] = device_id;
    next();
  }
}
