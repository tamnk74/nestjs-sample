import { ConfigService } from '@nestjs/config';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UserService } from '../../users/services';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../dtos';
import {
  UserNotFoundException,
  UserPasswordNotValidException,
} from 'modules/auth/exceptions';
import { UserEntity } from 'modules/users/entities';
import * as bcrypt from 'bcryptjs';

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
