import { createConnection, getConnectionOptions } from 'typeorm';

import { LoggerUtils } from '@shared/utils';

export class TypeORM {
  async connect(): Promise<void> {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
      Object.assign(defaultOptions, {
        database:
          process.env.NODE_ENV === 'testing'
            ? 'tests'
            : defaultOptions.database,
      }),
    )
      .then(() =>
        LoggerUtils.log('Connection established.', { tags: ['TypeORM'] }),
      )
      .catch(err =>
        LoggerUtils.error(`Error occurs: ${err}`, { tags: ['TypeORM'] }),
      );
  }
}
