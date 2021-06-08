import { Module } from '@nestjs/common';
import { AppService } from './services';
import { AuthModule } from 'modules/auth';
import { UserModule } from 'modules/users';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        synchronize: false,
        migrationsRun: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
