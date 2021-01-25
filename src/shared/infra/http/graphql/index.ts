import {
  ApolloServer as Apollo,
  ApolloError,
  CorsOptions,
} from 'apollo-server';
import { fileLoader } from 'merge-graphql-schemas';
import { buildSchema } from 'type-graphql';

import { serverConfig } from '@config';

import { FileUtils } from '@shared/utils';

export class ApolloServer {
  async connect(): Promise<Apollo> {
    const resolversArray: any = fileLoader(
      FileUtils.getRootPath(
        'modules',
        '**',
        'infra',
        'http',
        'graphql',
        'resolvers',
        process.env.NODE_ENV === 'production' ? '*.js' : '*.ts',
      ),
    );

    const schema = await buildSchema({
      resolvers: resolversArray,
    });

    const cors: CorsOptions = {
      credentials: true,
      origin: (requestOrigin, callback) => {
        if (
          process.env.NODE_ENV === 'development' ||
          process.env.NODE_ENV === 'testing'
        ) {
          callback(null, true);
        } else if (
          serverConfig.whitelist.indexOf(String(requestOrigin)) !== -1
        ) {
          callback(null, true);
        } else {
          callback(new ApolloError('Not allowed by CORS'));
        }
      },
    };

    const apolloServer = new Apollo({
      schema,
      cors,
      playground: true,
    });

    apolloServer.setGraphQLPath('/');

    return apolloServer;
  }
}
