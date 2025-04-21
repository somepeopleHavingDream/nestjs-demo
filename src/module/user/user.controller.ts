import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
  LoggerService,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TypeormFilter } from 'src/filters/typeorm.filter';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { getUserDto } from './dto/get-user.dto';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('user')
@UseFilters(new TypeormFilter())
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Get('/profile')
  @UseGuards(JwtGuard)
  getUserProfile(@Query('id', ParseIntPipe) id: any, @Req() req): any {
    console.log('🚀 ~ UserController ~ getUserProfile ~ req:', req.user);
    return this.userService.findProfile(id);
  }

  @Get('/:id')
  getUser(): any {
    return 'hello world';
  }

  @Get()
  // 装饰器的执行顺序：方法的装饰器如果有多个，则是从下往上执行
  // @UseGuards(AdminGuard)
  // @UseGuards(AuthGuard('jwt'))

  // 如果使用 @UseGuard 传递多个守卫，则从前往后执行，如果前面的 Guard 没有通过，则后面的 Guard 不会执行
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  getUsers(@Query() query: getUserDto): any {
    // page - 页码， limit - 每页条数， condition - 查询条件（ username,role,gender ）， sort - 排序
    // 前端传递的 Query 参数全是 string 类型，需要转换成 number 类型
    console.log('🚀 ~ UserController ~ getUsers ~ query:', query);
    return this.userService.findAll(query);
  }

  @Post()
  addUser(@Body(CreateUserPipe) dto: CreateUserDto): any {
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

  @Get('/logsByGroup')
  async getLogsByGroup(): Promise<any> {
    const res = await this.userService.findLogsByGroup(1);
    return res.map((o) => ({
      result: o.result,
      count: o.count,
    }));
  }
}
