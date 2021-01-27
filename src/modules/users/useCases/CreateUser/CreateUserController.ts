import { ApolloError } from 'apollo-server';
import { container } from 'tsyringe';

import { UNEXPECTED_ERROR } from '@shared/lib/graphql/error-codes';

import { CreateUserDTO } from './CreateUserDTO';
import { CreateUserResponseDTO } from './CreateUserResponseDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(
    private useCase: CreateUserUseCase = container.resolve(CreateUserUseCase),
  ) {}

  public async handler(data: CreateUserDTO): Promise<CreateUserResponseDTO> {
    try {
      return await this.useCase.execute(data);
    } catch (error) {
      throw new ApolloError(error.message || UNEXPECTED_ERROR);
    }
  }
}
