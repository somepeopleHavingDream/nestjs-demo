import { Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private logger: Logger,
  ) {}

  @Get()
  getUsers(): any {
    // this.logger.log('UserController getUsers');
    return this.userService.findAll();
  }

  @Post()
  addUser(): any {
    const user = {
      username: 'test',
      password: 'test',
    } as User;
    return this.userService.create(user);
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
