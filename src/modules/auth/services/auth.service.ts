import {
  UserNotFoundException,
  UserPasswordNotValidException,
} from '@/modules/auth/exceptions';
import { UserEntity } from '@/modules/users/entities';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { UserLoginDto } from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => JwtService)) private jwtService: JwtService,
  ) {}

  async validateUser(userLoginDto: UserLoginDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email: userLoginDto.email,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    const isValidPassword = await bcrypt.compare(
      userLoginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UserPasswordNotValidException();
    }

    return user;
  }

  async getAuthUser(userId: number): Promise<any> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    return user;
  }

  async generateToken(user: UserEntity) {
    const payload = { name: user.name, email: user.email, id: user.id };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
