import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const req = context.switchToHttp().getRequest();
    // console.log('这里是在拦截器执行之前', req);
    return next.handle().pipe(
      map((data) => {
        // console.log('这里是在拦截器执行之后', data);
        // return data;
        return plainToInstance(this.dto, data, {
          // 设置为 true 后，所有经过该 interceptor 的接口都需要设置 Expose 或 Exclude
          // Expose 就是设置哪些字段需要暴露， Exclude 就是设置哪些字段需要隐藏
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
