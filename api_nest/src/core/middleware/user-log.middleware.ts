import { LogThaoTacService } from '../../log-thao-tac/log-thao-tac.service';
import { AuthService } from '@core/auth/auth.service';
import { NguoiDung } from '@database/entities/auth/nguoi-dung.entity';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CreateLogThaoTacDto } from 'src/log-thao-tac/dto/log-thao-tac.dto';

@Injectable()
export class UserLogMiddleware implements NestMiddleware {
  private readonly loggingConfig = process.env.CORE_USER_ACTIVITY_LOG || 0;
  constructor(
    private readonly authService: AuthService,

    private readonly logThaoTacService: LogThaoTacService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let user: NguoiDung;
    //TODO Lấy thông tin từ JWT
    try {
      const token = (
        req.headers.authorization ||
        req.cookies['token'] ||
        ''
      ).replace('Bearer ', '');

      user = await this.authService.verifyToken(token);
    } catch (error) {}

    if (+this.loggingConfig && user) {
      const createLogThaoTacDto = new CreateLogThaoTacDto();
      createLogThaoTacDto.user_id = user.id;
      createLogThaoTacDto.user_name = user.ho_va_ten;
      createLogThaoTacDto.url = req.originalUrl;
      createLogThaoTacDto.method = req.method;
      createLogThaoTacDto.body = req.body;
      createLogThaoTacDto.statusCode = res.statusCode.toString();
      await this.logThaoTacService.create(createLogThaoTacDto);
    }

    if (next) {
      next();
    }
  }
}
