import { ObjectType, Field } from 'type-graphql';

import { PaginationSchema } from './associations/PaginationSchema';

@ObjectType()
class AnimeByCategoryData {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  category_name!: string;

  @Field(() => String)
  category_image!: string;
}

@ObjectType()
export class AnimeByCategorySchema extends PaginationSchema {
  @Field(() => [AnimeByCategoryData])
  data!: AnimeByCategoryData[];
}
