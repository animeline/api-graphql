import { GraphQLError } from 'graphql';
import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/database/typeorm/entities/User';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

import {
  toMessageWithCode,
  USER_ALREADY_REGISTERED,
} from '@shared/lib/graphql/error-codes';

import { CreateUserDTO } from './CreateUserDTO';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new GraphQLError(
        toMessageWithCode(
          USER_ALREADY_REGISTERED,
          'Email address already used.',
        ),
      );
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
