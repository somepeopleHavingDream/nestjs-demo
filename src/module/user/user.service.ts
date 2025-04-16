import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logs } from '../logs/logs.entity';
import { getUserDto } from './dto/get-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Logs)
    private readonly logsRepository: Repository<Logs>,
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

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'roles');
    // 后面的 .where 会替换前面的 .where
    if (username) {
      queryBuilder.where('user.username = :username', {
        username,
      });
    } else {
      queryBuilder.where('user.username IS NOT NULL');
    }
    if (gender) {
      queryBuilder.where('profile.gender = :gender', {
        gender,
      });
    } else {
      queryBuilder.where('profile.gender IS NOT NULL');
    }
    if (role) {
      queryBuilder.where('roles.id = :role', {
        role,
      });
    } else {
      queryBuilder.where('roles.id IS NOT NULL');
    }

    return queryBuilder.getMany();
  }

  find(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findProfile(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
  }

  async create(user: User) {
    const userTmp = this.userRepository.create(user);
    return this.userRepository.save(userTmp);
  }

  async update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
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
