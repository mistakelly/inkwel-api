import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from '../entity/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { PostDto } from '../dto/post.dto';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,

    private readonly userService: UserService,
  ) {}

  async create(userId: string, dto: PostDto.CreatePostDto) {
    console.log('userId', userId)
    const user = await this.userService.findUser(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    // create post
    const post = new PostDto.Root().getEntity(dto, user);

    return this.postRepo.save(post);
  }

  async findOne(userId: string, postId: string): Promise<PostEntity> {
    const user = await this.userService.findUser(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException(`Post with Id ${postId} not found`);
    }

    return post;
  }

  async update(userId: string, postId: string, dto: PostDto.UpdatePostDto) {
    const user = await this.userService.findUser(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const post = await this.findOne(userId, postId);


    post.content = dto.content;

    return await this.postRepo.save(post);
  }

  async delete(userId: string, postId: string) {
    const user = await this.userService.findUser(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const post = await this.findOne(userId, postId);


    await this.postRepo.delete(post.id)

  }
}
