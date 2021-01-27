import { container } from 'tsyringe';
import { Authorized, Ctx, Query, Resolver } from 'type-graphql';

import { AuthenticationContext } from '@modules/users/infra/http/middlewares/AuthenticationAssurance';
import { ShowProfileController } from '@modules/users/useCases/ShowProfile/ShowProfileController';

import { ShowProfileSchema } from '../schemas/ShowProfileSchema';

@Resolver()
export class ShowProfileResolver {
  @Query(() => ShowProfileSchema, {
    name: 'profile',
    description: 'Shows user profile information',
  })
  @Authorized()
  async showProfile(@Ctx() { token }: AuthenticationContext) {
    const controller = container.resolve(ShowProfileController);

    return await controller.handler(token);
  }
}

export default ShowProfileResolver;
