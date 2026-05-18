import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpCoreException } from '../exceptions/core.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Lấy message và code từ exception trả ra
    const message = exception.message;
    let code: string;
    let mess: string;
    if (exception.constructor === HttpCoreException) {
      [mess, code] = message.split('||');
      if (!code) code = '500';
    } else {
      code = '500';
      mess = message;
    }

    this.logger.error(exception.stack);
    response.status(200).json({
      code: Number(code),
      status: false,
      message: mess,
      data: null,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
