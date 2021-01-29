/* eslint-disable import/no-dynamic-require */

require('dotenv').config();

const { readdirSync } = require('fs');
const { join, resolve } = require('path');

const dirName = __dirname;
const isProduction = process.env.NODE_ENV === 'production';

const configFolder = isProduction ? 'dist' : 'src';
const configFormatFile = isProduction ? '.js' : '.ts';

const configPath = join(dirName, configFolder, 'config');
const configFile = readdirSync(configPath)[0];
const configFullPath = resolve(configPath, configFile);

const { databaseConfig } = require(configFullPath);

const { host, port, username, password, database } = databaseConfig.typeorm;

module.exports = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: [
    `${configFolder}/modules/**/infra/database/typeorm/entities/*${configFormatFile}`,
  ],
  migrations: [
    `${configFolder}/shared/infra/database/typeorm/migrations/*${configFormatFile}`,
  ],
  cli: {
    migrationsDir: `${configFolder}/shared/infra/database/typeorm/migrations`,
  },
};
