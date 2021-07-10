import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services';
import { AuthModule } from 'modules/auth';
import { UserRepository } from './repositories';
import { UserSubscriber } from './subscribers';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UserService, UserSubscriber],
  exports: [UserService],
})
export class UserModule {}
