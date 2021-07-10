import { Module } from '@nestjs/common';
import { AppService } from './services';
import { AuthModule } from 'modules/auth';
import { UserModule } from 'modules/users';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitOfWorkModule } from 'database/unit-of-work';
import { databaseConfig } from 'common/config';

console.log(__dirname);
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: databaseConfig,
      inject: [ConfigService],
    }),
    UnitOfWorkModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
