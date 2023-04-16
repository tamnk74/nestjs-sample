import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { User } from 'src/decorators';
import { AuthGuard } from 'src/guards';
import { RefreshTokenDto, UserLoginDto } from '../dtos';
import { AuthPayload } from '../interfaces/auth.interface';
import { AuthService } from '../services';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    const user = await this.authService.validateUser(userLoginDto);
    const accessToken = await this.authService.generateToken(user);
    const refreshToken = await this.authService.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const user = await this.authService
      .validateRefreshToken(refreshTokenDto)
      .catch(() => {
        throw new Error('Invalid refresh token');
      });
    const accessToken = await this.authService.generateToken(user);
    const refreshToken = await this.authService.generateRefreshToken(user);
    return {
      accessToken,
      refreshToken,
    };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getProfile(@User() user: AuthPayload) {
    const userEntity = await this.authService.getAuthUser(user.id);
    return instanceToPlain(userEntity);
  }
}
