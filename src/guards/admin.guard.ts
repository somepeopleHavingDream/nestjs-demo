import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from 'src/module/user/user.entity';
import { UserService } from 'src/module/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  // 常见的错误：在使用 AdminGuard 时，未导入 UserModule
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取请求对象
    const req = context.switchToHttp().getRequest();
    console.log('🚀 ~ AdminGuard ~ req:', req);

    // 获取请求中的用户信息进行逻辑上的判断 -> 角色判断
    const user = (await this.userService.find(req.user.username)) as User;
    console.log('🚀 ~ AdminGuard ~ user:', user);

    // 普通用户
    if (user.roles.filter((o) => o.id === 2).length > 0) {
      return true;
    }

    return true;
  }
}
