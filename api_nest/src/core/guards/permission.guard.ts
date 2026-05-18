import { CORE_COMMON_ERROR, HTTP_CODE } from '@configs/contanst';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { HttpCoreException } from '../exceptions/core.exception';

@Injectable()
export class PermissionGuard implements CanActivate {
  private readonly logger = new Logger(PermissionGuard.name);

  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const action = this.reflector.get<string>('action', context.getHandler());
    // Nếu không kiểm tra quyền thì mặc đinh bypass
    if (!action) {
      return true;
    }

    // Bắt đầu kiểm tra quyền truy cập
    const request: Request = context.switchToHttp().getRequest();
    const perName = request.url.split('/')[1].split('?')[0];

    const isAllowAccess = this.authService.checkUserPermission(
      request['user'],
      perName,
      action,
    );
    this.logger.debug(
      request['user']?.['tai_khoan'] + ' -> ' + perName + ' -> ' + isAllowAccess,
    );

    if (!isAllowAccess) {
      throw new HttpCoreException(
        CORE_COMMON_ERROR.PERMISSION_DENY,
        HTTP_CODE.UNAUTHORIZED,
      );
    }
    return true;
  }
}
