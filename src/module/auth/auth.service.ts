import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { getUserDto } from '../user/dto/get-user.dto';

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

  signup(username: string, password: string) {
    return {
      username,
      password,
    };
  }
}
