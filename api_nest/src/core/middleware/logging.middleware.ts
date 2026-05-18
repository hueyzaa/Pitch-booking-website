import { AuthService } from '@core/auth/auth.service';
import { Log } from '@database/entities/system/log.entity';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly loggingConfig = process.env.CORE_LOGGING || 0;
  constructor(
    private readonly authService: AuthService,

    @InjectRepository(Log)
    private readonly logRepo: Repository<Log>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    let userId = undefined;
    //TODO Lấy thông tin từ JWT
    try {
      const token = (
        req.headers.authorization ||
        req.cookies['token'] ||
        ''
      ).replace('Bearer ', '');

      const signData = await this.authService.verifyToken(token);
      userId = signData.id;
    } catch (error) {}

    let logId = null;
    if (+this.loggingConfig) {
      logId = await this.logRepo
        .save({
          method: req.method,
          device_id: `${req.headers['device_id']}`,
          user_id: userId,
          request_url: req.originalUrl,
          request_param: JSON.stringify(req.params),
          request_query: JSON.stringify(req.query),
          request_header: JSON.stringify(req.headers),
          request_body: JSON.stringify(req.body),
          response_code: '',
          response_body: '',
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }

    this.getResponseLog(res, logId?.id);

    if (next) {
      next();
    }
  }

  getResponseLog = async (res: Response, logId: any) => {
    const rawResponse = res.write;
    const rawResponseEnd = res.end;

    let chunkBuffers = [];
    let response;
    res.write = (...chunks) => {
      const resArgs = [];
      for (let i = 0; i < chunks.length; i++) {
        if (chunks[i]) resArgs[i] = Buffer.from(chunks[i]);

        if (!chunks[i]) {
          res.once('drain', res.write);

          // Resume from last falsy iteration
          --i;
        }
      }

      if (Buffer.concat(resArgs)?.length) {
        chunkBuffers = [...chunkBuffers, ...resArgs];
      }
      return rawResponse.apply(res, resArgs);
    };

    res.end = (...chunks) => {
      // Will log nothing: res.write is a writable stream

      const resArgs = [];
      for (let i = 0; i < chunks.length; i++) {
        // undefined values would break Buffer.concat(resArgs)
        if (chunks[i]) resArgs[i] = Buffer.from(chunks[i]);
      }

      // resArgs[0] contains the response body
      if (Buffer.concat(resArgs)?.length) {
        chunkBuffers = [...chunkBuffers, ...resArgs];
      }

      const body = Buffer.concat(chunkBuffers).toString('utf8');

      const responseLog = {
        response: {
          statusCode: res.statusCode,
          body: body || {},
          headers: res.getHeaders(),
        },
      };
      if (+this.loggingConfig) {
        this.logRepo
          .update(logId, {
            response_code: res.statusCode.toString(),
            response_body: body,
          })
          .catch((error) => {
            console.log(error);
            return;
          });
      }
      rawResponseEnd.apply(res, resArgs);
      response = responseLog;
      return responseLog as unknown as Response;
    };
    return response;
  };
}
