import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from 'src/enum/action.enum';
import { Article } from '../auth/casl/article.entity';
import { User } from '../auth/casl/user.entity';

// InferSubjects<T> 是 @casl/ability 提供的类型工具，用于根据传入的类（如 Article、User）推断出它们可以作为权限控制“主题”（subject）的类型
type Subjects = InferSubjects<typeof Article | typeof User> | 'all';

// AppAbility 表示“对某个资源（Subjects）能否执行某个操作（Action）”的能力类型，是 CASL 权限系统的基础类型
type AbilityTuple = [Action, Subjects];
export type AppAbility = MongoAbility<AbilityTuple>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<
      MongoAbility<AbilityTuple>
    >(createMongoAbility);

    if (user.isAdmin) {
      // all is a special keyword in CASL that represents "any subject".
      can(Action.Manage, 'all'); // admin can manage all
    } else {
      can(Action.Read, 'all');
    }

    // 用户只能更新自己写的文章
    can(Action.Update, Article, { authorId: user.id });
    cannot(Action.Delete, Article, { isPublished: true });

    // can/cannot 定义规则，build 结合 detectSubjectType 让这些规则能自动应用到实际的对象上，两者是配套使用的
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
