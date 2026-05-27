import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpCoreException } from '../exceptions/core.exception';
import { HelperService } from '@helper/helper.service';
import { DATABASE_GENERAL_ERROR } from '@configs/contanst';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly helperService: HelperService,
  ) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    switch (exception.constructor) {
      case HttpCoreException: {
        const [message, code] = exception.message.split('||');

        return httpAdapter.reply(
          ctx.getResponse(),
          {
            code: Number(code || 500),
            status: false,
            message: this.helperService.transformMessage(message),
            data: null,
            timestamp: new Date().toISOString(),
            path: request.url,
          },
          HttpStatus.OK,
        );
      }
      case HttpException: {
        const message = exception.message;

        let responseBody = exception.getResponse();
        if (!responseBody) {
          responseBody = {
            code: 500,
            status: false,
            message: this.helperService.transformMessage(message),
            data: null,
            timestamp: new Date().toISOString(),
            path: request.url,
          };
        }

        return httpAdapter.reply(
          ctx.getResponse(),
          responseBody,
          HttpStatus.OK,
        );
      }

      default: {
        const messageStr = exception?.message || '';
        let code = 500;
        
        if (
          messageStr.includes(DATABASE_GENERAL_ERROR.DUPLICATE_ENTRY) ||
          messageStr.includes(DATABASE_GENERAL_ERROR.FOREIGN_KEY) ||
          messageStr.includes(DATABASE_GENERAL_ERROR.NOT_NULL) ||
          messageStr.includes(DATABASE_GENERAL_ERROR.DATA_TOO_LONG) ||
          messageStr.includes(DATABASE_GENERAL_ERROR.ER_NO_REFERENCED_ROW_2) ||
          messageStr.includes(DATABASE_GENERAL_ERROR.ER_WARN_DATA_OUT_OF_RANGE)
        ) {
          code = 400;
        }

        const responseBody = {
          code: code,
          status: false,
          message: this.helperService.transformMessage(messageStr),
          data: null,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
        return httpAdapter.reply(
          ctx.getResponse(),
          responseBody,
          HttpStatus.OK,
        );
      }
    }
  }
}
