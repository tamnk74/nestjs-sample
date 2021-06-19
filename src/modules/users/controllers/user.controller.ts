import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from '../dtos';
import { UserService } from '../services';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async index() {
    const user = await this.userService.findAll();

    return user;
  }

  @Post('/')
  async create(@Body() userLoginDto: CreateUserDto) {
    const user = await this.userService.createUser(userLoginDto);

    return user;
  }
}
