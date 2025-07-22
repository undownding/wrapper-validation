import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class WrapperInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: unknown): any => {
        // 如果数据是对象且已经包含 data 或 error 属性，则认为已经自行包装
        if (
          data &&
          typeof data === 'object' &&
          (data['data'] || data['error'])
        ) {
          return data;
        }

        const response = context.switchToHttp().getResponse<Response>();

        const statusCode = response.statusCode;
        return {
          statusCode,
          message: 'success',
          data,
        };
      }),
    );
  }
}
