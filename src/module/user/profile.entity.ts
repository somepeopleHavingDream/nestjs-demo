import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: number;

  @Column()
  photo: string;

  @Column()
  address: string;

  @OneToOne(() => User, {
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
