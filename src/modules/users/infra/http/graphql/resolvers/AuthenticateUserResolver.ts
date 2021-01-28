import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { Arg, Mutation, Resolver } from 'type-graphql';

import {
  AuthenticateUserController,
  AuthenticateUserResponseDTO,
} from '@modules/users/useCases/AuthenticateUser';

import { AuthenticateUserSchema } from '../schemas/AuthenticateUserSchema';

@Resolver()
export class AuthenticateUserResolver {
  @Mutation(() => AuthenticateUserSchema, {
    description: 'Creates user authentication',
  })
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<AuthenticateUserResponseDTO> {
    const controller = container.resolve(AuthenticateUserController);

    const { user, token } = await controller.handler({ email, password });

    return {
      user: classToClass(user),
      token,
    };
  }
}

export default AuthenticateUserResolver;
