const { databaseConfig } = require('./dist/config');

const { host, port, username, password, database } = databaseConfig.typeorm;

module.exports = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: ['src/modules/**/infra/database/typeorm/entities/*.ts'],
  migrations: ['src/shared/infra/database/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/shared/infra/database/typeorm/migrations',
  },
};
