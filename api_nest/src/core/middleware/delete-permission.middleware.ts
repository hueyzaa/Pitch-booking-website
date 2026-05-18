import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import { UserReqData } from '../users/interfaces/user-req.interface';
import { ROLE } from '@configs/contanst';

interface RequestWithUser extends Request {
  user?: UserReqData;
}

@Injectable()
export class DeletePermissionMiddleware implements NestMiddleware {
  constructor(private readonly dataSource: DataSource) {}

  async use(
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    if (req.method !== 'DELETE') {
      return next();
    }

    const user = req.user;

    if (!user || !user.id || !user.ma_vai_tro) {
      throw new UnauthorizedException('Không tìm thấy thông tin người dùng');
    }

    if (user.ma_vai_tro === ROLE.ADMIN) {
      return next();
    }

    const resourceIdString = req.params.id;
    if (!resourceIdString) {
      throw new BadRequestException('Resource ID không tồn tại');
    }

    const resourceId = parseInt(resourceIdString, 10);
    if (isNaN(resourceId)) {
      throw new BadRequestException('Resource ID phải là số');
    }

    const baseUrlParts = req.originalUrl.split('/');
    const entitySlug = baseUrlParts[baseUrlParts.length - 2];
    if (!entitySlug) {
      throw new BadRequestException('Không xác định được entity từ URL');
    }
    const tableName = entitySlug.replace(/-/g, '_');

    try {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      const result = await queryRunner.query(
        `SELECT nguoi_tao FROM ${tableName} WHERE id = ?`,
        [resourceId],
      );

      await queryRunner.release();

      if (!result || result.length === 0) {
        throw new NotFoundException(
          `Không tìm thấy bản ghi với ID ${resourceId} trong bảng ${tableName}.`,
        );
      }

      const record = result[0];
      if (record.nguoi_tao !== user.id) {
        throw new ForbiddenException(
          'Bạn không có quyền xóa. Chỉ người tạo hoặc admin mới có quyền',
        );
      }

      next();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Đã xảy ra lỗi khi kiểm tra quyền xóa.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
