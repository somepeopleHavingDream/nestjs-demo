import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { TypeormFilter } from 'src/filters/typeorm.filter';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller('auth')
@UseFilters(new TypeormFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() dto: SigninUserDto) {
    const { username, password } = dto;
    return this.authService.signin(username, password);
  }

  @Post('signup')
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
