import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    console.log('这里是在拦截器执行之前', req);
    return next.handle().pipe(
      map((data) => {
        console.log('这里是在拦截器执行之后', data);
        return data;
      }),
    );
  }
}
