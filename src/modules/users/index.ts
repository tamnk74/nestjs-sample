import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services';
import { AuthModule } from 'modules/auth';
import { UserRepository } from 'modules/users/repositories';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [UserController],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
