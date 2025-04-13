import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { ConfigEnum } from './enum/config.enum';
import { Logs } from './module/logs/logs.entity';
import { Roles } from './module/roles/roles.entity';
import { Profile } from './module/user/profile.entity';
import { User } from './module/user/user.entity';
import { UserModule } from './module/user/user.module';

const envFilePath =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';

@Global()
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development')
          .required(),
        DB_PORT: Joi.number().default(3306).required(),
        DB_HOST: Joi.string().ip().required(),
        DB_TYPE: Joi.string().valid('mysql').required(),
        DB_DATABASE: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false).required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get<string>(ConfigEnum.DB_TYPE),
          host: configService.get<string>(ConfigEnum.DB_HOST),
          port: configService.get<number>(ConfigEnum.DB_PORT),
          username: configService.get<string>(ConfigEnum.DB_USERNAME),
          password: configService.get<string>(ConfigEnum.DB_PASSWORD),
          database: configService.get<string>(ConfigEnum.DB_DATABASE),
          entities: [User, Profile, Roles, Logs],
          synchronize: configService.get<boolean>(ConfigEnum.DB_SYNC),
          // logging: process.env.NODE_ENV !== 'production',
        }) as TypeOrmModuleOptions,
    }),
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     transport: {
    //       targets: [
    //         process.env.NODE_ENV === 'development'
    //           ? {
    //               level: 'info',
    //               target: 'pino-pretty',
    //               options: {
    //                 colorize: true,
    //               },
    //             }
    //           : {
    //               level: 'info',
    //               target: 'pino-roll',
    //               options: {
    //                 file: join('logs', 'log.txt'),
    //                 frequency: 'daily',
    //                 size: '10M',
    //                 mkdir: true,
    //               },
    //             },
    //       ],
    //     },
    //   },
    // }),
  ],
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
export class AppModule {}
