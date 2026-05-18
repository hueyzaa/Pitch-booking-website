import { CORE_COMMON_ERROR, HTTP_CODE } from '@configs/contanst';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { HttpCoreException } from '../exceptions/core.exception';
import { UserService } from '../profile/profile.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // Check token
    const token = (
      req.headers.authorization ||
      req.cookies['token'] ||
      ''
    ).replace('Bearer ', '');

    if (!token) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.INVALID_TOKEN,
        HTTP_CODE.FORBIDDEN,
      );
    }

    const signData = await this.authService.verifyToken(token);
    const user = await this.userService.findOneByUserName(signData.tai_khoan);
    req['user'] = user;

    next();
  }
}
