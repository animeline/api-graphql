const { databaseConfig } = require('./dist/config');

const { host, port, username, password, database } = databaseConfig.typeorm;

const getFolder = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

module.exports = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: [`${getFolder}/modules/**/infra/database/typeorm/entities/*.ts`],
  migrations: [`${getFolder}/shared/infra/database/typeorm/migrations/*.ts`],
  cli: {
    migrationsDir: `${getFolder}/shared/infra/database/typeorm/migrations`,
  },
};
