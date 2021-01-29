// GraphQL
export const serverConfig = {
  port: process.env.PORT,
  whitelist: ['http://localhost:3000'],
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
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS || undefined,
    },
  },
};

// JWT
export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || 'default',
    expiresIn: '1d',
  },
};

// Mail
export const mailConfig = {
  driver: process.env.MAIL_DRIVER || 'gmail',
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
  defaults: {
    from: {
      name: 'Animeline',
      email: 'no-reply@animeline.ml',
    },
  },
};

// Upload
export const uploadConfig = {
  driver: 'imgur',
};

// Api
export const apiConfig = {
  api: process.env.ANIME_API_URL,
  cdn: process.env.ANIME_CND_URL,
};
