import { ApolloError } from 'apollo-server';
import { container } from 'tsyringe';

import { UNEXPECTED_ERROR } from '@shared/lib/graphql/error-codes';

import { ShowProfileResponseDTO } from './ShowProfileResponseDTO';
import { ShowProfileUseCase } from './ShowProfileUseCase';

export class ShowProfileController {
  constructor(
    private useCase: ShowProfileUseCase = container.resolve(ShowProfileUseCase),
  ) {}

  public async handler(token: string): Promise<ShowProfileResponseDTO> {
    try {
      return await this.useCase.execute(token);
    } catch (error) {
      throw new ApolloError(error.message || UNEXPECTED_ERROR);
    }
  }
}
