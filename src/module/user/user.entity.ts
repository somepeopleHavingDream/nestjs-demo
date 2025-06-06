import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterRemove,
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

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  // ts -> 数据库 关联关系 Mapping
  @OneToMany(() => Logs, (logs) => logs.user, {
    createForeignKeyConstraints: false,
  })
  logs: Logs[];

  @ManyToMany(() => Roles, (roles) => roles.users, {
    createForeignKeyConstraints: false,
    cascade: ['insert'],
  })
  @JoinTable({ name: 'users_roles' })
  roles: Roles[];

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @AfterInsert()
  afterInsert() {
    console.log('user afterInsert', this);
  }

  @AfterRemove()
  afterRemove() {
    console.log('user afterRemove', this);
  }
}
