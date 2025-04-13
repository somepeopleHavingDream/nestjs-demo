import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Logs } from '../logs/logs.entity';
import { Roles } from '../roles/roles.entity';
import { Profile } from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // ts -> 数据库 关联关系 Mapping
  @OneToMany(() => Logs, (logs) => logs.user, {
    createForeignKeyConstraints: false,
  })
  logs: Logs[];

  @ManyToMany(() => Roles, (roles) => roles.users, {
    createForeignKeyConstraints: false,
  })
  @JoinTable({ name: 'users_roles' })
  roles: Roles[];

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}
