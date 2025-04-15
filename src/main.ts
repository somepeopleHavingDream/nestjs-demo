import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 关闭整个 nestjs 日志
    // logger: false,
    // logger: ['error', 'warn'],
    // logger,
  });
  app.setGlobalPrefix('api/v1');
  // app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
