import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { TypeormFilter } from 'src/filters/typeorm.filter';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller('auth')
@UseFilters(new TypeormFilter())
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Post('signin')
  async signin(@Body() dto: SigninUserDto) {
    const { username, password } = dto;
    const token = await this.authService.signin(username, password);
    return {
      access_token: token,
    };
  }

  @Post('signup')
  // @UseInterceptors(new SerializeInterceptor())
  signup(@Body() dto: SigninUserDto) {
    const { username, password } = dto;

    // if (!username || !password) {
    //   throw new HttpException('Username and password are required', 400);
    // }
    // if (typeof username !== 'string' || typeof password !== 'string') {
    //   throw new HttpException('Username and password must be strings', 400);
    // }
    // if (
    //   !(typeof username === 'string' && username.length >= 6) ||
    //   !(typeof password === 'string' && password.length >= 6)
    // ) {
    //   throw new HttpException(
    //     'Username and password must be at least 6 characters long',
    //     400,
    //   );
    // }

    return this.authService.signup(username, password);
  }
}
