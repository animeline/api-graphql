require("dotenv/config");

module.exports = {
  type: process.env.TYPEORM_TYPE,    
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ["src/modules/**/infra/database/typeorm/entities/*.ts"],
  migrations: ["src/shared/infra/database/typeorm/migrations/*.ts"],
  cli: {
    migrationsDir: "src/shared/infra/database/typeorm/migrations",
  },
};
