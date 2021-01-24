import IoRedis from 'ioredis';

import { cacheConfig } from '@config';

import { LoggerUtils } from '@shared/utils';

export class Redis {
  connect(): void {
    const client = new IoRedis(cacheConfig.config.redis);

    client.on('connect', () =>
      LoggerUtils.log('Connection established.', { tags: ['Redis'] }),
    );

    client.on('error', err =>
      LoggerUtils.error(`Error occurs: ${err}`, { tags: ['Redis'] }),
    );
  }
}
