import { container } from 'tsyringe';
import { Resolver, Mutation, Arg } from 'type-graphql';

import { SendForgotPasswordController } from '@modules/users/useCases/SendForgotPassword';

@Resolver()
export class SendForgotPasswordResolver {
  @Mutation(() => Boolean, {
    description: 'Send forgot password email',
  })
  async sendForgotPassword(@Arg('email') email: string): Promise<Boolean> {
    const controller = container.resolve(SendForgotPasswordController);

    return await controller.handler({ email });
  }
}

export default SendForgotPasswordResolver;
