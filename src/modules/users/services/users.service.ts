import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';


@Injectable()
export class UsersService {
  private readonly users: UserEntity[];

  constructor() {
    this.users = [
      {
        id: 1,
        email: 'admin@mailinator.com',
        password: 'Admin123',
      },
    ];
  }

  async findOne(email: string): Promise<UserEntity | undefined> {
    return this.users.find(user => user.email === email);
  }
}
