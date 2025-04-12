import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  getUsers(): any {
    // const data = this.configService.get<string>('db');
    // console.log('DB:', data);

    const port = this.configService.get<number>('DB_PORT');
    console.log('DB_PORT:', port);
    return this.userService.getUsers();
  }
}
