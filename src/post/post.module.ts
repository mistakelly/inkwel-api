import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entity/post.entity';
import { postController } from './controller/post.controller';
import { PostService } from './service/post.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), UserModule],
  controllers: [postController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
