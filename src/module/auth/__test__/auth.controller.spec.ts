import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/module/user/user.entity';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    // 模拟的 AuthService -> 与后续的依赖项 UserService 等无关联的依赖项
    mockAuthService = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      signin: (username: string, password: string) => {
        return Promise.resolve('token');
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      signup: (useranme: string, password: string) => {
        return Promise.resolve({} as User);
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
