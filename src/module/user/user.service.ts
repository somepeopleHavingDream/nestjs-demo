import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { conditionUtils } from 'src/utils/db.helper';
import { In, Repository } from 'typeorm';
import { Logs } from '../logs/logs.entity';
import { Roles } from '../roles/roles.entity';
import { getUserDto } from './dto/get-user.dto';
import { User } from './user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Logs)
    private readonly logsRepository: Repository<Logs>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  findAll(query: getUserDto) {
    const { limit, page, username, gender, role } = query;
    const take = limit || 10;
    const skip = ((page || 1) - 1) * take;

    // return this.userRepository.find({
    //   relations: {
    //     profile: true,
    //     roles: true,
    //   },
    //   where: {
    //     username,
    //     profile: {
    //       gender,
    //     },
    //     roles: {
    //       id: role,
    //     },
    //   },
    //   take,
    //   skip,
    // });

    const obj = {
      'user.username': username,
      'profile.gender': gender,
      'roles.id': role,
    };
    let queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'roles');
    queryBuilder = conditionUtils<User>(queryBuilder, obj);
    return queryBuilder.take(take).skip(skip).getMany();
  }

  find(username: string) {
    return this.userRepository.findOne({
      where: { username },
      relations: ['roles'],
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  findProfile(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
  }

  async create(user: Partial<User>) {
    if (!user.roles) {
      const role = await this.rolesRepository.findOne({
        where: { id: 2 },
      });
      if (role) {
        user.roles = [role];
      }
    }

    if (user.roles instanceof Array && typeof user.roles[0] === 'number') {
      // 查询所有的用户角色
      user.roles = await this.rolesRepository.find({
        where: {
          id: In(user.roles),
        },
      });
    }

    const userTmp = this.userRepository.create(user);
    // 对用户密码使用 argon2 加密
    userTmp.password = await argon2.hash(userTmp.password);
    const res = await this.userRepository.save(userTmp);
    return res;
    // try {
    //   const res = await this.userRepository.save(userTmp);
    //   return res;
    // } catch (error) {
    //   console.log('🚀 ~ create ~ error:', error);

    //   if (error?.errno && error?.errno === 1062) {
    //     throw new HttpException(error.sqlMessage, 500);
    //   }
    // }
  }

  async update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  async remove(id: number) {
    // return this.userRepository.delete(id);
    const user = await this.findOne(id);
    if (user) {
      return this.userRepository.remove(user);
    }
  }

  findLogsByGroup(id: number) {
    return this.logsRepository
      .createQueryBuilder('logs')
      .select('logs.result', 'result')
      .addSelect('COUNT("logs.result")', 'count')
      .leftJoinAndSelect('logs.user', 'user')
      .where('user.id = :id', { id })
      .groupBy('logs.result')
      .orderBy('result', 'DESC')
      .getRawMany();
  }
}
