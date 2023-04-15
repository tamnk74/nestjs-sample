import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities';
import { UserService } from './services';
import { UserSubscriber } from './subscribers';

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
