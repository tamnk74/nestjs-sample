import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneOrFail({ email });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.create(user);
  }
}
