import { GraphQLError } from 'graphql';
import { injectable, inject } from 'tsyringe';

import { ITokenProvider } from '@modules/users/providers/TokenProvider/models/ITokenProvider';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

import {
  toMessageWithCode,
  USER_NOT_FOUND,
} from '@shared/lib/graphql/error-codes';

import { ShowProfileResponseDTO } from './ShowProfileResponseDTO';

interface IDecodeData {
  iat: number;
  exp: number;
  sub: string;
}

@injectable()
export class ShowProfileUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute(token: string): Promise<ShowProfileResponseDTO> {
    const { sub } = this.tokenProvider.decode<IDecodeData>(token);

    const user = await this.userRepository.findById(sub);

    if (!user) {
      throw new GraphQLError(
        toMessageWithCode(USER_NOT_FOUND, 'User not found.'),
      );
    }

    return user;
  }
}
