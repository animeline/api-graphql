import { ObjectType, Field } from 'type-graphql';

import { PaginationSchema } from './associations/PaginationSchema';

@ObjectType()
class AnimeByCategoryData {
  @Field()
  id!: string;

  @Field()
  category_name!: string;

  @Field()
  category_image!: string;
}

@ObjectType()
export class AnimeByCategorySchema extends PaginationSchema {
  @Field(() => [AnimeByCategoryData])
  data!: AnimeByCategoryData[];
}
