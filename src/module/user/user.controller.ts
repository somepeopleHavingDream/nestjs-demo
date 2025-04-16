import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  LoggerService,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { User } from './user.entity';
import { UserService } from './user.service';
import { getUserDto } from './dto/get-user.dto';

@Controller('user')
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
  updateUser(@Body() dto: any, @Param('id') id: number): any {
    const user = dto as User;
    return this.userService.update(id, user);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number): any {
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
