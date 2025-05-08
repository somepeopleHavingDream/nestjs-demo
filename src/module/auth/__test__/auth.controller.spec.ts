import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/module/user/user.entity';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { SigninUserDto } from '../dto/signin-user.dto';

describe('AuthController（登录认证模块）', () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    // 模拟的 AuthService -> 与后续的依赖项 UserService 等无关联的依赖项
    mockAuthService = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      signin: (username: string, password: string) => {
        return Promise.resolve('token');
      },

      signup: (username: string, password: string) => {
        const user = new User();
        user.username = username;
        user.password = password;
        return Promise.resolve(user);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('鉴权-初始化-实例化', () => {
    expect(controller).toBeDefined();
  });

  it('鉴权-控制器-sigin 注册', async () => {
    const res = controller.signin({
      username: 'test',
      password: '123456',
    } as SigninUserDto);
    expect(await res).not.toBeNull();
    expect((await res).access_token).toBe('token');
  });

  it('鉴权-控制器-signup 注册', async () => {
    const res = controller.signup({
      username: 'test',
      password: '123456',
    } as SigninUserDto);
    expect(await res).not.toBeNull();
    expect((await res).id).not.toBeNull();
    expect((await res) instanceof User).toBeTruthy();
    expect((await res).username).toBe('test');
  });
});
