import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { UserEntity } from 'src/modules/users/entities';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { PostRequest } from '../dtos';
import { PostEntity } from '../entities';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  create(postModel: PostRequest): Promise<InsertResult> {
    return this.postRepository.insert({
      ...postModel,
      slug: slugify(postModel.title),
      status: 0,
    });
  }

  get(): Promise<PostEntity[] | undefined> {
    return this.postRepository.find();
  }

  getPostsByUser(user: UserEntity): Promise<PostEntity[]> {
    return this.postRepository.find({
      where: { author: { id: user.id } },
    });
  }

  getById(id: number): Promise<PostEntity | null> {
    return this.postRepository.findOneBy({ id });
  }

  async update(postId: number, postModel: PostRequest): Promise<UpdateResult> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (!post) {
      throw new Error('Post not found');
    }
    return this.postRepository.update(postId, {
      ...post?.toJSON(),
      ...postModel,
    });
  }

  async updateFields(
    postId: number,
    postModel: Partial<PostRequest>,
  ): Promise<UpdateResult> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (!post) {
      throw new Error('Post not found');
    }
    return this.postRepository.update(postId, {
      ...post?.toJSON(),
      ...postModel,
    });
  }

  delete(id: number): Promise<DeleteResult> {
    return this.postRepository.delete({ id: id });
  }
}
