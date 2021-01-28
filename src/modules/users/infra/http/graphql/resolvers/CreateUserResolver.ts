import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { Resolver, Mutation, Arg } from 'type-graphql';

import {
  CreateUserController,
  CreateUserResponseDTO,
} from '@modules/users/useCases/CreateUser';

import { CreateUserSchema } from '../schemas/CreateUserSchema';

@Resolver()
export class CreateUserResolver {
  @Mutation(() => CreateUserSchema, {
    description: 'Create a new user',
  })
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<CreateUserResponseDTO> {
    const controller = container.resolve(CreateUserController);
    const user = await controller.handler({ name, email, password });

    return classToClass(user);
  }
}

export default CreateUserResolver;
