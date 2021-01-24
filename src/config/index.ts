import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';
  config: {
    redis: RedisOptions;
  };
}

// GraphQL Server
export const serverConfig = {
  port: process.env.PORT,
  whitelist: process.env.WHITELIST,
};

// TypeORM
export const databaseConfig = {
  typeorm: {
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
  },
};

// Redis
export const cacheConfig = {
  driver: 'redis',
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheConfig;

// JWT
export const authConfig = {
  secret: process.env.JWT_SECRET,
};

// Mail
export const mailConfig = {
  user: process.env.MAIL_USER,
  password: process.env.MAIL_PASS,
};

// Api
export const apiConfig = {
  api: process.env.ANIME_API_URL,
  cdn: process.env.ANIME_CND_URL,
};
