import { GraphQLError } from 'graphql';
import { inject, injectable } from 'tsyringe';

import { authConfig } from '@config';

import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '@modules/users/providers/TokenProvider/models/ITokenProvider';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

import {
  toMessageWithCode,
  USER_INCORRECT_COMBINATION,
} from '@shared/lib/graphql/error-codes';

import { AuthenticateUserDTO } from './AuthenticateUserDTO';
import { AuthenticateUserResponseDTO } from './AuthenticateUserResponseDTO';

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({
    email,
    password,
  }: AuthenticateUserDTO): Promise<AuthenticateUserResponseDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new GraphQLError(
        toMessageWithCode(
          USER_INCORRECT_COMBINATION,
          'Incorrect email/password combination.',
        ),
      );
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new GraphQLError(
        toMessageWithCode(
          USER_INCORRECT_COMBINATION,
          'Incorrect email/password combination.',
        ),
      );
    }

    const { expiresIn } = authConfig.jwt;

    const token = this.tokenProvider.create(
      {},
      {
        subject: user.id,
        expiresIn,
      },
    );

    return { user, token };
  }
}
