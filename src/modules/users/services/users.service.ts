import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneOrFail({ email });
  }
}
