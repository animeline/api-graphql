import 'reflect-metadata';
import 'dotenv/config';

import { eachSeries } from 'async';

import '@shared/container/providers';

import { Redis } from '@shared/infra/database/redis';
import { TypeORM } from '@shared/infra/database/typeorm';
import { ApolloServer } from '@shared/infra/http/graphql';

const app = new ApolloServer();
const database = new TypeORM();
const cache = new Redis();

const iterableCollection = [
  () => app.connect(),
  () => database.connect(),
  () => cache.connect(),
];

async function main(): Promise<void> {
  await eachSeries(iterableCollection, async run => run());
}

main();
