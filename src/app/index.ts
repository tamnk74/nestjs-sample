import { Module } from '@nestjs/common';
import { AppService } from './services';
import { AuthModule } from 'modules/auth';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
