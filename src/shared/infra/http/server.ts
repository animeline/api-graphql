import express, { Express } from 'express';
import cors from 'cors';

import { LoggerUtils } from '@shared/utils';

import GraphQL from './graphql';
import rateLimiter from './middlewares/rateLimiter';

class ExpressServer {
  public app: Express;

  private graphql: GraphQL;

  constructor() {
    this.app = express();
    this.graphql = new GraphQL();
  }

  async connect(): Promise<void> {
    this.app.use(rateLimiter);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.listen(3003, () =>
      this.graphql
        .connect(this.app)
        .then(() => LoggerUtils.log('Server started', { tags: ['HTTP'] })),
    );
  }
}

export default ExpressServer;
