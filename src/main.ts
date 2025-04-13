import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule, {
    // 关闭整个 nestjs 日志
    // logger: false,
    // logger: ['error', 'warn'],
  });
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
