import { Action } from 'src/enum/action.enum';
import { AppAbility } from './casl-ability.factory';
import { IPolicyHandler } from './casl.interface';
import { Article } from '../auth/casl/article.entity';

export class ReadArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Article);
  }
}
