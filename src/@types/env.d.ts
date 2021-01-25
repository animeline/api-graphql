declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'testing';

    // GraphQL Server
    PORT: number;
    WHITELIST: string[];

    // TypeORM
    TYPEORM_HOST: string;
    TYPEORM_PORT: number;
    TYPEORM_USERNAME: string;
    TYPEORM_PASSWORD: string;
    TYPEORM_DATABASE: string;

    // Redis
    REDIS_HOST: number;
    REDIS_PORT: number;
    REDIS_PASS: string;

    // JWT
    JWT_SECRET: string;

    // Mail
    MAIL_USER: string;
    MAIL_PASS: string;

    // Endoints Api
    ANIME_API_URL: string;
    ANIME_CND_URL: string;
  }
}
