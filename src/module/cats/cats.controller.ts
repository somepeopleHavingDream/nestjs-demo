import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Action } from 'src/enum/action.enum';
import { Article } from '../auth/casl/article.entity';
import { User } from '../auth/casl/user.entity';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { CheckPolicies } from '../casl/casl.interface';
import { PoliciesGuard } from '../casl/policies.guard';
import { ReadArticlePolicyHandler } from '../casl/read-article-policy.handler';
import { CatsService } from './cats.service';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly caslAbilityFactory: CaslAbilityFactory, // Inject the CaslAbilityFactory
  ) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return await this.catsService.create(createCatDto);
  }

  @Get('/testCasl')
  testCasl() {
    const user = new User();
    user.id = 1;

    const article = new Article();
    article.authorId = user.id;

    const ability = this.caslAbilityFactory.createForUser(user);
    let result: string = '';
    if (ability.can(Action.Read, 'all')) {
      result += 'You can read all;';
    }
    if (ability.can(Action.Read, Article)) {
      result += 'You can read article;';
    }
    if (ability.can(Action.Delete, Article)) {
      result += 'You can delete article;';
    }
    if (ability.can(Action.Create, Article)) {
      result += 'You can create article;';
    }
    if (ability.can(Action.Update, article)) {
      result += 'You can update article;';
    }

    return result;
  }

  @Get()
  async findAll() {
    return await this.catsService.findAll1();
  }

  @Get('/findAll2')
  async findAll2() {
    return await this.catsService.findAll2();
  }

  @Get('/findAll3')
  @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Article))
  @CheckPolicies(new ReadArticlePolicyHandler())
  async findAll3() {
    return await this.catsService.findAll1();
  }
}
