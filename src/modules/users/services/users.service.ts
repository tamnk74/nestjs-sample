import { Injectable } from '@nestjs/common';
import { BaseRepository, TransactionalRepository } from 'database/unit-of-work';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(private transactionRepository: TransactionalRepository) {}

  get userRepository(): BaseRepository<UserEntity> {
    return this.transactionRepository.getRepository(UserRepository);
  }

  async findOne(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneOrFail({ email });
  }

  async createUsers(users: UserEntity[]): Promise<UserEntity[] | undefined> {
    return Promise.all(users.map(user => this.userRepository.save(user)));
  }
}
