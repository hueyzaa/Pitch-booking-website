import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import mainConfig from 'src/configs/main.config';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.getArgByIndex(0);
    const url: string = request.url;
    return next.handle().pipe(
      map((data) => {
        if (mainConfig.responseInterceptorExcludePaths.test(url)) {
          return data;
        }

        return { code: 200, status: true, message: 'OK', data };
      }),
    );
  }
}
