import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = async (configService: ConfigService) =>
  ({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: +configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    logging: true,
  } as TypeOrmModuleOptions);
