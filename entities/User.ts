import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  EntityRepository,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
  BeforeInsert,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { User as Definition } from '../resources';
import Credential from '../entities/Credential';
import BaseRepository from './BaseRepository';

@Entity('users')
export default class User implements Definition {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  id: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    nullable: false,
  })
  is_leader: boolean;

  @Column({
    nullable: false,
  })
  phone_number: string;

  @Column({
    nullable: true,
  })
  email: string;
  // @OneToOne(() => Credential, (credential) => credential.user, {
  //   nullable: true,
  // })
  // @JoinColumn()
  // credential: Credential;

  @Column({
    nullable: true,
  })
  code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}
