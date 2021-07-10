import { Injectable } from '@nestjs/common';
import { UserService } from '../../users/services';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../dtos';
import { UserNotFoundException } from 'exceptions/user-not-found.exception';
import { UserPasswordNotValidException } from 'exceptions/user-password-not-valid.exception';
import { UserEntity } from 'modules/users/entities';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userLoginDto: UserLoginDto): Promise<any> {
    const user = await this.userService.findOne(userLoginDto.email);
    if (!user) {
      throw new UserNotFoundException();
    }
    if (user?.password !== userLoginDto.password) {
      throw new UserPasswordNotValidException();
    }
    return user;
  }

  async generateToken(user: UserEntity) {
    const payload = { username: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
  async createUsers(users: UserEntity[]) {
    return this.userService.createUsers(users);
  }
}
