import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
// import * as dotenv from 'dotenv';
import Configuration from './configuration';

// const envFilePath =
//   process.env.NODE_ENV === 'production'
//     ? '.env.production'
//     : '.env.development';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath,
      // load: [() => dotenv.config({ path: '.env' })],
      load: [Configuration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
