import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import {
  UserNotFoundException,
  UserPasswordNotValidException,
} from 'src/modules/auth/exceptions';
import { UserEntity } from 'src/modules/users/entities';
import { Repository } from 'typeorm';
import { RefreshTokenDto, UserLoginDto } from '../dtos';

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

  async validateRefreshToken(refreshTokenDto: RefreshTokenDto): Promise<any> {
    const payload = await this.jwtService.verifyAsync(
      refreshTokenDto.refreshToken,
      {
        secret: this.configService.get('auth.refreshSecret'),
      },
    );

    const user = await this.userRepository.findOneBy({ id: payload.id });

    if (!user) {
      throw new UserNotFoundException();
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
      secret: this.configService.get('auth.secret'),
    });
  }

  async generateRefreshToken(user: UserEntity) {
    const payload = { id: user.id };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('auth.refreshSecret'),
    });
  }
}
