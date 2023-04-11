import {
  UserNotFoundException,
  UserPasswordNotValidException,
} from '@/modules/auth/exceptions';
import { UserEntity } from '@/modules/users/entities';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../../users/services';
import { UserLoginDto } from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @Inject(forwardRef(() => JwtService)) private jwtService: JwtService,
  ) {}

  async validateUser(userLoginDto: UserLoginDto): Promise<any> {
    const user = await this.userService.findOne(userLoginDto.email);
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

  async generateToken(user: UserEntity) {
    const payload = { username: user.email, sub: user.id };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
