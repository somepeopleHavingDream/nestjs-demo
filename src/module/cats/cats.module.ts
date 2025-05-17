import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cat.schema';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cat.name,
        schema: CatSchema,
      },
    ]),
    CacheModule.register(),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
