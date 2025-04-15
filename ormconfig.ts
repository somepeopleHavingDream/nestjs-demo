import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Logs } from 'src/module/logs/logs.entity';
import { Roles } from 'src/module/roles/roles.entity';
import { Profile } from 'src/module/user/profile.entity';
import { User } from 'src/module/user/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const connectionParams = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'testdb',
  entities: [User, Profile, Roles, Logs],
  synchronize: true,
  logging: false,
} as TypeOrmModuleOptions;

export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);
