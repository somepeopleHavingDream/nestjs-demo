import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cat.schema';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cat.name,
        schema: CatSchema,
      },
    ]),
    CacheModule.register(),
    HttpModule,
    CaslModule,
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
