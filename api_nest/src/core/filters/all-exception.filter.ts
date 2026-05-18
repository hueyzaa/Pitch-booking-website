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

      default:
        const responseBody = {
          code: 500,
          status: false,
          message: this.helperService.transformMessage(exception.message),
          data: null,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
        return httpAdapter.reply(
          ctx.getResponse(),
          responseBody,
          HttpStatus.OK,
        );
        break;
    }
  }
}
