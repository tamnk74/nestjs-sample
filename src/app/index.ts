import { Module } from '@nestjs/common';
import { AppService } from './services';
import { AuthModule } from 'modules/auth';
import { UserModule } from 'modules/users';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dbConfig from '../config/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      ...dbConfig,
      synchronize: false,
      subscribers: [],
      autoLoadEntities: true,
      migrationsRun: true,
      logging: true,
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
