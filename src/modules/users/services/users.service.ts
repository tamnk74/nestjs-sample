import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.create(user);
  }
}
