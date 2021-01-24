import {
  ApolloServer as Apollo,
  ApolloError,
  CorsOptions,
} from 'apollo-server';
import { fileLoader } from 'merge-graphql-schemas';
import { buildSchema } from 'type-graphql';

import { serverConfig } from '@config';

import { FileUtils, LoggerUtils } from '@shared/utils';

export class ApolloServer {
  async connect(): Promise<void> {
    const resolversArray: any = fileLoader(
      FileUtils.getRootPath(
        'modules',
        '**',
        'infra',
        'http',
        'graphql',
        'resolvers',
        process.env.NODE_ENV === 'development' ? '*.ts' : '*.js',
      ),
    );

    const schema = await buildSchema({
      resolvers: resolversArray,
    });

    const cors: CorsOptions = {
      credentials: true,
      origin: (requestOrigin, callback) => {
        if (process.env.NODE_ENV === 'development') {
          callback(null, true);
        } else if (Array(serverConfig.whitelist).length === 0) {
          callback(null, true);
        } else if (
          Array(serverConfig.whitelist).indexOf(requestOrigin) !== -1
        ) {
          callback(null, true);
        } else {
          callback(new ApolloError('Not allowed by CORS'));
        }
      },
    };

    const apolloServer = new Apollo({
      schema,
      context: ({ req, res }) => ({
        req,
        res,
        token: req.headers.authorization,
      }),
      cors,
      playground: true,
    });

    return apolloServer
      .listen({ port: serverConfig.port })
      .then(() => LoggerUtils.log('Server started.', { tags: ['HTTP'] }));
  }
}
