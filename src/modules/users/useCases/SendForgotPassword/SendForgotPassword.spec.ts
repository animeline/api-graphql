import { GraphQLError } from 'graphql';

import { FakeUserRepository } from '@modules/users/repositories/fakes/FakeUserRepository';
import { FakeUserTokenRepository } from '@modules/users/repositories/fakes/FakeUserTokenRepository';

import { FakeMailProvider } from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import { SendForgotPasswordUseCase } from './SendForgotPasswordUseCase';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordUseCase;

describe('Send Forgot Password', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordUseCase(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be able to recover the password using the email', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(GraphQLError);
  });

  it('should generate a forgot password token', async () => {
    const generateTokens = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(generateTokens).toHaveBeenCalledWith(user.id);
  });
});
