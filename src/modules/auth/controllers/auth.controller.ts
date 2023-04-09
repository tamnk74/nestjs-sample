import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from 'guards';
import { UserLoginDto } from '../dtos';
import { AuthService } from '../services';
import { User } from 'decorators';
import { ConfigService } from '@nestjs/config';

@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    const user = await this.authService.validateUser(userLoginDto);
    const token = await this.authService.generateToken(user);

    return {
      access_token: token,
    };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req: { user: unknown }) {
    return req.user;
  }

  @Get('dec')
  getDecorator(@User() user: unknown) {
    return user;
  }

  @Get('env')
  getEnv() {
    return this.configService;
  }
}
