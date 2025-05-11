import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { setupApp } from './setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 允许跨域
    cors: true,
  });

  setupApp(app);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
