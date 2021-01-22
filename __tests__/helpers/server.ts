import { ApolloServer as Apollo } from 'apollo-server';
import { fileLoader } from 'merge-graphql-schemas';
import { buildSchema } from 'type-graphql';

import { FileUtils } from '../../src/shared/utils/FileUtils';

export class ApolloServer {
  public async start(): Promise<Apollo> {
    const resolversArray: any = fileLoader(
      FileUtils.getPath(
        'modules',
        '**',
        'infra',
        'http',
        'graphql',
        'resolvers',
        '*.ts',
      ),
    );

    const schema = await buildSchema({
      resolvers: resolversArray,
    });

    const apolloServer = new Apollo({
      schema,
      context: ({ req, res }) => ({
        req,
        res,
        token: req.headers.authorization,
      }),
    });

    return apolloServer;
  }
}
