import { ObjectType } from 'type-graphql';

import { CreateUserSchema as UserSchema } from './CreateUserSchema';

@ObjectType()
export class ShowProfileSchema extends UserSchema {}
