import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        email: 'admin@example.com',
      },
    });

    if (countAdmin === 0) {
      await this.repository.save(
        this.repository.create({
          name: 'Admin',
          email: 'admin@example.com',
          password: 'Admin123',
        }),
      );
    }
  }
}
