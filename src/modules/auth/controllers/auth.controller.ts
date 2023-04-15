import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { User } from 'src/decorators';
import { AuthGuard } from 'src/guards';
import { UserLoginDto } from '../dtos';
import { AuthPayload } from '../interfaces/auth.interface';
import { AuthService } from '../services';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

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
  async getProfile(@User() user: AuthPayload) {
    const userEntity = await this.authService.getAuthUser(user.id);
    return instanceToPlain(userEntity);
  }
}
