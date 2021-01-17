import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';
import { buildSchema } from 'type-graphql';
import { fileLoader } from 'merge-graphql-schemas';

import { FileUtils } from '@shared/utils';

class GraphqlServer {
  public server: ApolloServer;

  async connect(app: Application): Promise<void> {
    const resolversArray: any = fileLoader(
      FileUtils.getRootPath(
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

    this.server = new ApolloServer({
      schema,
      playground: true,
    });

    return this.server.applyMiddleware({ app, path: '/' });
  }
}

export default GraphqlServer;
