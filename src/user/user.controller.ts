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
    const url = this.configService.get<string>('DB_URL');
    console.log('DB Host:', dbHost);
    console.log('DB:', db);
    console.log('DB URL:', url);
    return this.userService.getUsers();
  }
}
