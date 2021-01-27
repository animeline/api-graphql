import { GraphQLError } from 'graphql';
import { resolve } from 'path';
import { injectable, inject } from 'tsyringe';

import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/users/repositories/IUserTokensRepository';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import {
  toMessageWithCode,
  USER_NOT_EXIST,
} from '@shared/lib/graphql/error-codes';

import { SendForgotPasswordDTO } from './SendForgotPasswordDTO';

@injectable()
export class SendForgotPasswordUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: SendForgotPasswordDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new GraphQLError(
        toMessageWithCode(USER_NOT_EXIST, 'User does not exists.'),
      );
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const SendForgotPasswordMail = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Animeline] Recuperação de senha',
      templateData: {
        file: SendForgotPasswordMail,
        variables: {
          name: user.name,
          link: `${process.env.WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}
