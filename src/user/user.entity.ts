import { Logs } from 'src/logs/logs.entity';
import { Roles } from 'src/roles/roles.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
