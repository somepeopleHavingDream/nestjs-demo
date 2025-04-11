import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/enum/config.enum';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  getUsers(): any {
    const db = this.configService.get<string>(ConfigEnum.DB);
    const dbHost = this.configService.get<string>(ConfigEnum.DB_HOST);
    console.log('DB Host:', dbHost);
    console.log('DB:', db);
    return this.userService.getUsers();
  }
}
