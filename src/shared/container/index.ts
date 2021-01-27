import { container } from 'tsyringe';

import '@modules/users/providers';

import './providers';

import { UserRepository } from '@modules/users/infra/database/typeorm/repositories/UserRepository';
import { UserTokenRepository } from '@modules/users/infra/database/typeorm/repositories/UserTokenRepository';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/users/repositories/IUserTokensRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);
