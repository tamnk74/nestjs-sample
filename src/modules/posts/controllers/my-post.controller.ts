import { User } from '@/decorators';
import { AuthGuard } from '@/guards';
import { UserEntity } from '@/modules/users/entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { PostRequest } from '../dtos';
import { PostEntity } from '../entities';
import { PostService } from '../services';

@UseGuards(AuthGuard)
@Controller('/me/posts')
export class MyPostController {
  constructor(private postService: PostService) {}

  @Post('/')
  async createPost(
    @Body() postRequest: PostRequest,
    @User() user: UserEntity,
  ): Promise<InsertResult> {
    const post = await this.postService.create({
      ...postRequest,
      author: user,
    });

    return post;
  }

  @Put('/:id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: PostRequest,
  ): Promise<UpdateResult> {
    return this.postService.update(id, updatePostDto);
  }

  @Patch('/:id')
  async updateFieldPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: Partial<PostRequest>,
  ): Promise<UpdateResult> {
    return this.postService.updateFields(id, updatePostDto);
  }

  @Delete('/:id')
  async deletePost(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this.postService.delete(id);
  }

  @Get('/')
  async getMyPosts(@User() user: UserEntity): Promise<unknown | undefined> {
    const posts = await this.postService.getPostsByUser(user);
    const result = posts?.map((post: PostEntity) => post.toJSON());
    return result;
  }
}
