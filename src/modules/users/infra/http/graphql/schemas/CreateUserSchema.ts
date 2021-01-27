import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class CreateUserSchema {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => Date)
  created_at!: Date;

  @Field(() => Date)
  updated_at!: Date;
}
