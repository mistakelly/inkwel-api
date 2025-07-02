import { UserEntity } from 'src/user/entity/user.entity';
import { PostEntity } from '../entity/post.entity';

export namespace PostDto {
  export class Root {
    id: string;
    content: string;
    author: {
      id: string;
      username: string;
    };

    getEntity(dto: CreatePostDto, user: UserEntity) {
      const entity = new PostEntity();
      entity.content = dto.content;
      entity.author = user;

      return entity;
    }
  }

  export const createDtoFromEntity = (entity: PostEntity) => {
    const dto = new Root();
    dto.id = entity.id;
    dto.content = entity.content;
    dto.author = {
      id: entity.author.id,
      username: entity.author.username,
    };

    return dto;
  };

  export type CreatePostDto = {
    content: string;
  };

  export type UpdatePostDto = {
    content: string;
  };
}
