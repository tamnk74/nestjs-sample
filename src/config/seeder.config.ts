import * as ormConfig from './orm.config';

module.exports = {
  ...ormConfig,
  migrationsTableName: 'orm_seeeders',
  migrations: ['src/database/seed/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/seed',
  },
};
