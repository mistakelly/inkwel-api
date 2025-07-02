import { BaseEntity } from 'src/common/entity/base.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('posts')
export class PostEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (author) => author.stories, { nullable: false })
  author: UserEntity;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true })
  slug?: string;
}
