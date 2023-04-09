import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
  migrationsTableName: 'orm_seeeders',
  type: 'postgres',
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  port: +(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'changeme',
  database: process.env.POSTGRES_DB || 'nestdb',
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/database/seed/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
});
