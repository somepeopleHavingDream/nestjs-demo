import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosResponse } from 'axios';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { Cat } from './cat.schema';
import { CreateCatDto } from './create-cat.dto';

@Injectable()
export class CatsService {
  static readonly CACHE_KEY = 'key';

  constructor(
    @InjectModel(Cat.name) private catModel: Model<Cat>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpService: HttpService,
  ) {}

  create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll1(): Promise<Cat[]> {
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

  findAll2(): Observable<AxiosResponse<Cat[]>> {
    return this.httpService.get<Cat[]>('http://localhost:3000/cats');
  }
}
