import { UserEntity } from '../entities';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { BaseRepository } from 'database/unit-of-work';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {}
