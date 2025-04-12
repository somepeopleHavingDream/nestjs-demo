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
    // const db = this.configService.get<string>(ConfigEnum.DB);
    // const dbHost = this.configService.get<string>(ConfigEnum.DB_HOST);
    // const url = this.configService.get<string>('DB_URL');
    // console.log('DB Host:', dbHost);
    // console.log('DB:', db);
    // console.log('DB URL:', url);

    const data = this.configService.get<string>('db');
    console.log('DB:', data);
    return this.userService.getUsers();
  }
}
