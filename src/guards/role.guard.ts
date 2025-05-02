import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { UserService } from 'src/module/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // jwt -> userId -> user -> roles
    // getAllAndMerge -> 合并， getAllAndOverride -> 读取路由上的 metadata
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const req = await context.switchToHttp().getRequest();
    const user = await this.userService.find(req.user.username);
    if (!user) {
      return false;
    }

    const roleIds = user.roles.map((o) => o.id);
    const flag = requiredRoles.some((role) => roleIds.includes(role));
    return flag;
  }
}
