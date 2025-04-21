import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwt: JwtService,
  ) {}

  async signin(username: string, password: string) {
    // const res = await this.userService.findAll({
    //   username,
    // } as getUserDto);

    const user = await this.userService.find(username);
    if (user && user.password === password) {
      // 生成 token
      return await this.jwt.signAsync({
        username: user.username,
        sub: user.id,
      });
    }

    throw new UnauthorizedException();
  }

  async signup(username: string, password: string) {
    const res = await this.userService.create({
      username,
      password,
    });
    return res;
  }
}
