import RedisClient from 'ioredis';

import { LoggerUtils } from '@shared/utils';

export class Redis {
  connect(): void {
    const client = new RedisClient(
      Number(process.env.REDIS_PORT),
      process.env.REDIS_HOST,
    );

    client.on('connect', () =>
      LoggerUtils.log('Connection established.', { tags: ['Redis'] }),
    );

    client.on('error', err =>
      LoggerUtils.error(`Error occurs: ${err}`, { tags: ['Redis'] }),
    );
  }
}
