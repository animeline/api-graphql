import { ObjectType, Field } from 'type-graphql';

import { CreateUserSchema as UserSchema } from './CreateUserSchema';

@ObjectType()
export class AuthenticateUserSchema {
  @Field(() => UserSchema)
  user!: UserSchema;

  @Field(() => String)
  token!: string;
}
