import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig, authConfig, databaseConfig } from 'src/config';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import { AuthModule } from 'src/modules/auth';
import { UserModule } from 'src/modules/users';
import { PostModule } from './modules/posts';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      // useFactory: databaseConfig,
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
