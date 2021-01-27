import { ApolloError } from 'apollo-server';
import { container } from 'tsyringe';

import { UNEXPECTED_ERROR } from '@shared/lib/graphql/error-codes';

import { AuthenticateUserDTO } from './AuthenticateUserDTO';
import { AuthenticateUserResponseDTO } from './AuthenticateUserResponseDTO';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  constructor(
    private useCase: AuthenticateUserUseCase = container.resolve(
      AuthenticateUserUseCase,
    ),
  ) {}

  public async handler(
    data: AuthenticateUserDTO,
  ): Promise<AuthenticateUserResponseDTO> {
    try {
      return await this.useCase.execute(data);
    } catch (error) {
      throw new ApolloError(error.message || UNEXPECTED_ERROR);
    }
  }
}
