import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'guards';
import { UserLoginDto } from '../dtos';
import { AuthService } from '../services';
import { ConfigService } from '@nestjs/config';
import { UnitOfWork } from 'database/unit-of-work';

@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private uow: UnitOfWork,
  ) {}

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    const user = await this.authService.validateUser(userLoginDto);
    const token = await this.authService.generateToken(user);

    return {
      access_token: token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/users')
  async getDecorator(@Body() users) {
    const result = await this.uow.withTransaction(() => {
      return this.authService.createUsers(users);
    });
    return result;
  }

  @Get('env')
  getEnv() {
    return this.configService;
  }
}
