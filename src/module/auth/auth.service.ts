import { Injectable } from '@nestjs/common';
import { getUserDto } from '../user/dto/get-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signin(username: string, _password: string) {
    const res = await this.userService.findAll({
      username,
    } as getUserDto);
    return res;
  }

  async signup(username: string, password: string) {
    const res = await this.userService.create({
      username,
      password,
    });
    return res;
  }
}
