import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
  LoggerService,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TypeormFilter } from 'src/filters/typeorm.filter';
import { getUserDto } from './dto/get-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseFilters(new TypeormFilter())
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Get('/:id')
  getUser(): any {
    return 'hello world';
  }

  @Get()
  getUsers(@Query() query: getUserDto): any {
    // page - 页码， limit - 每页条数， condition - 查询条件（ username,role,gender ）， sort - 排序
    // 前端传递的 Query 参数全是 string 类型，需要转换成 number 类型
    console.log('🚀 ~ UserController ~ getUsers ~ query:', query);
    return this.userService.findAll(query);
  }

  @Post()
  addUser(@Body() dto: any): any {
    const user = dto as User;
    return this.userService.create(user);
  }

  @Patch('/:id')
  updateUser(
    @Body() dto: any,
    @Param('id') id: number,
    @Headers('Authorization') headers: any,
  ): any {
    console.log('🚀 ~ UserController ~ headers:', headers);

    if (id !== headers) {
      throw new UnauthorizedException();
    }

    const user = dto as User;
    return this.userService.update(id, user);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: number): any {
    return this.userService.remove(id);
  }

  @Get('/profile')
  getUserProfile(): any {
    return this.userService.findProfile(1);
  }

  @Get('/logsByGroup')
  async getLogsByGroup(): Promise<any> {
    const res = await this.userService.findLogsByGroup(1);
    return res.map((o) => ({
      result: o.result,
      count: o.count,
    }));
  }
}
