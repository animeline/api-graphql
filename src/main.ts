import 'dotenv/config';
import 'reflect-metadata';

import { eachSeries } from 'async';

import '@shared/container/providers';

import { Redis } from '@shared/infra/database/redis';
import { TypeORM } from '@shared/infra/database/typeorm';
import { Server } from '@shared/infra/http/server';

const server = new Server();
const database = new TypeORM();
const cache = new Redis();

const iterableCollection = [
  () => server.connect(),
  () => database.connect(),
  () => cache.connect(),
];

async function main(): Promise<void> {
  await eachSeries(iterableCollection, async run => run());
}

main();
