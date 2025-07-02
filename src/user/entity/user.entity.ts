import { BaseEntity } from 'src/common/entity/base.entity';
import { PostEntity } from 'src/post/entity/post.entity';
import { Column, Entity, OneToMany } from 'typeorm';

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

  @OneToMany(() => PostEntity, (stories) => stories.author)
  stories: PostEntity[];

  // @Column()
  // authType: AuthType;
}
