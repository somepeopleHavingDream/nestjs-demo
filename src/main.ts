import { NestFactory } from '@nestjs/core';
import { utilities, WinstonModule } from 'nest-winston';
import winston, { createLogger } from 'winston';
import { AppModule } from './app.module';
// import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  // const logger = new Logger();

  const instance = createLogger({
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        level: 'info',
        dirname: 'logs',
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      }),
    ],
  });

  const logger = WinstonModule.createLogger({
    instance,
  });

  const app = await NestFactory.create(AppModule, {
    // 关闭整个 nestjs 日志
    // logger: false,
    // logger: ['error', 'warn'],
    logger,
  });
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  await app.listen(process.env.PORT ?? 3000);
  // logger.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
