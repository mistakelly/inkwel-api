import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

export enum AuthType {
  UsernameAndPassword = 'Username_Password',
  EmailAndPassword = 'Email_Password',
  PhoneAndPassword = 'Phone_Password',
  EmailOnly = 'email_only',
  SocialAuth = 'SocialAuth',
}

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column({ unique: false, nullable: true })
  email?: string;

  @Column({ nullable: true, unique: true })
  phone?: string;

  @Column({ nullable: true })
  password: string;

  // @Column()
  // authType: AuthType;
}
