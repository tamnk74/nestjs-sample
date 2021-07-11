import { Module } from '@nestjs/common';
import { AppService } from './services';
import { AuthModule } from 'modules/auth';
import { UserModule } from 'modules/users';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'common/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
