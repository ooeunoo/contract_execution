import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IResponse } from '../app.interface';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((result: any): IResponse => {
        return {
          success: true,
          data: result,
        };
      }),
      // 추후 에러 가능성있는 로직을 포함할 경우, 주석 해제
      // catchError((e) => {
      //   return throwError(e instanceof HttpException ? new CustomInternalServerException()
      // })
    );
  }
}
