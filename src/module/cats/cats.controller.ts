import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return await this.catsService.create(createCatDto);
  }

  @Get()
  async findAll() {
    return await this.catsService.findAll1();
  }

  @Get('/findAll2')
  async findAll2() {
    return await this.catsService.findAll2();
  }
}
