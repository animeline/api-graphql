import { ApolloError } from 'apollo-server';
import { container } from 'tsyringe';

import { UNEXPECTED_ERROR } from '@shared/lib/graphql/error-codes';

import { SendForgotPasswordDTO } from './SendForgotPasswordDTO';
import { SendForgotPasswordUseCase } from './SendForgotPasswordUseCase';

export class SendForgotPasswordController {
  constructor(
    private useCase: SendForgotPasswordUseCase = container.resolve(
      SendForgotPasswordUseCase,
    ),
  ) {}

  public async handler(data: SendForgotPasswordDTO): Promise<any> {
    try {
      await this.useCase.execute(data);

      return true;
    } catch (error) {
      throw new ApolloError(error.message || UNEXPECTED_ERROR);
    }
  }
}
