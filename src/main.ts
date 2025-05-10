import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { setupApp } from './setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 关闭整个 nestjs 日志
    // logger: false,
    // logger: ['error', 'warn'],
    // logger,
  });

  setupApp(app);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
