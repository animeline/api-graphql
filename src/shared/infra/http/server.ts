import { serverConfig } from '@config';

import { LoggerUtils } from '@shared/utils';

import { ApolloServer } from './graphql';

export class Server {
  public connect(): void {
    const server = new ApolloServer();

server.connect().then(apolloServer => {
  apolloServer
    .listen({ port: serverConfig.port })
    .then(() => LoggerUtils.log('Server started.', { tags: ['HTTP'] }));
});
  }
}
