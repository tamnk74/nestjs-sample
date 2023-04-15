import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/database/base.repository';
import { Repository } from 'typeorm';
import { PostEntity } from '../entities';

@Injectable()
export class PostRepository extends BaseRepository<PostEntity> {
  constructor(
    @InjectRepository(PostEntity)
    repository: Repository<PostEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
