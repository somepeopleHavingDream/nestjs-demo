import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import * as requestIp from 'request-ip';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg: unknown = exception['response'] || 'Internal Server Error';
    // 加入更多异常错误逻辑
    // if (exception instanceof QueryFailedError) {
    //   msg = exception.message;
    // }

    const responseBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      timestamp: new Date().toISOString(),
      ip: requestIp.getClientIp(request),
      exception: exception['name'],
      error: msg,
    };

    // this.logger.error('[yx]', responseBody);
    console.error('[yx]', responseBody);
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
