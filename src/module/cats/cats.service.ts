import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { Cat } from './cat.schema';
import { CreateCatDto } from './create-cat.dto';

@Injectable()
export class CatsService {
  static readonly CACHE_KEY = 'key';

  constructor(
    @InjectModel(Cat.name) private catModel: Model<Cat>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    const cachedValue = await this.cacheManager.get<Cat[]>(
      CatsService.CACHE_KEY,
    );
    if (cachedValue) {
      return cachedValue;
    }

    const result = this.catModel.find().exec();

    await this.cacheManager.set(CatsService.CACHE_KEY, result, 5000);
    return result;
  }
}
