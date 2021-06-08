export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  port: +process.env.POSTGRES_PORT || '5432',
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'changeme',
  database: process.env.POSTGRES_DB || 'nestdb',
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
