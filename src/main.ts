import 'reflect-metadata';
import 'dotenv/config';

import { eachSeries } from 'async';

import '@shared/container/providers';

import Server from '@shared/infra/http/server';
import * as database from '@shared/infra/database/typeorm';

const server = new Server();

const iterableCollection = [() => server.connect(), () => database.connect()];

async function main(): Promise<void> {
  await eachSeries(iterableCollection, async run => run());
}

main();
