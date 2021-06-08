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
import { User } from 'decorators';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {
    console.log('controller');
  }

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

  @Get('dec')
  getDecorator(@User() user) {
    return user;
  }
}
