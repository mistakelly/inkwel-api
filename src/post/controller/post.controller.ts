import { Controller, HttpCode, Req, UseGuards } from '@nestjs/common';
import { PostService } from '../service/post.service';
import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import { PostDto } from '../dto/post.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('post')
export class postController {
  constructor(private readonly postService: PostService) {}

  @TypedRoute.Post()
  async create(
    @TypedBody() dto: PostDto.CreatePostDto,
    @Req() req: any,
  ): Promise<PostDto.Root> {
    const res = await this.postService.create(req.user.id, dto);

    return PostDto.createDtoFromEntity(res);
  }

  @TypedRoute.Get(':postId')
  async findOne(@Req() req: any, @TypedParam('postId') postId: string) {
    const res = await this.postService.findOne(req.user, postId);

    return PostDto.createDtoFromEntity(res);
  }

  @TypedRoute.Patch(':postId')
  async update(
    @Req() req: any,
    @TypedParam('postId') postId: string,
    @TypedBody() dto: PostDto.UpdatePostDto,
  ): Promise<PostDto.Root> {
    const res = await this.postService.update(req.user.id, postId, dto);

    return PostDto.createDtoFromEntity(res);
  }

  @HttpCode(200)
  @TypedRoute.Delete(':postId')
  async delete(@Req() req: any, @TypedParam('postId') postId: string) {
    return await this.postService.delete(req.user.id, postId);
  }
}
