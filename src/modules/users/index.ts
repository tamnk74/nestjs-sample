import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services';
import { AuthModule } from 'modules/auth';
import { UserRepository } from 'modules/users/repositories';
import { UserSubscriber } from './subscribers';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [UserController],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UserService, UserSubscriber],
  exports: [UserService],
})
export class UserModule {}
