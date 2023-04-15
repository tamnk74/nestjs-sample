import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PostEntity } from '../entities';
import { PostService } from '../services';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/')
  async getPosts(): Promise<unknown | undefined> {
    const posts = await this.postService.get();
    const result = posts?.map((post: PostEntity) => post.toJSON());
    return result;
  }

  @Get('/:id')
  async getPostById(@Param() id: number): Promise<unknown> {
    const post = await this.postService.getById(id);
    if (!post) {
      throw new NotFoundException('NOT FOUND');
    }
    return post.toJSON();
  }
}
