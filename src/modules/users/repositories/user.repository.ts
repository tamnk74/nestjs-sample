import { UserEntity } from '../entities';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<UserEntity> {}
