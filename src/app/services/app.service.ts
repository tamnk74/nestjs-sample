import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AuthService } from 'modules/auth/services';
import { UserService } from 'modules/users/services';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly moduleOptions = { strict: false };
  private userService: UserService;
  private authService: AuthService;

  constructor(private readonly moduleRef: ModuleRef) {}

  public async onModuleInit(): Promise<void> {
    this.userService = this.moduleRef.get(UserService, this.moduleOptions);
    this.authService = this.moduleRef.get(AuthService, this.moduleOptions);
  }
}
