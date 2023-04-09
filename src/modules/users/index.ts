import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services';
import { AuthModule } from 'modules/auth';
import { UserSubscriber } from './subscribers';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities';

@Module({
  controllers: [UserController],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserService, UserSubscriber],
  exports: [UserService],
})
export class UserModule {}
