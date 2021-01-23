require('dotenv').config();

const { databaseConfig } = require('./dist/config/database');

const { host, port, username, password, database } = databaseConfig;

module.exports = {
  type: 'postgres',
  host: host || process.env.TYPEORM_HOST,
  port: port || process.env.TYPEORM_PORT,
  username: username || process.env.TYPEORM_USERNAME,
  password: password || process.env.TYPEORM_PASSWORD,
  database: database || process.env.TYPEORM_DATABASE,
  entities: ['src/modules/**/infra/database/typeorm/entities/*.ts'],
  migrations: ['src/shared/infra/database/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/shared/infra/database/typeorm/migrations',
  },
};
