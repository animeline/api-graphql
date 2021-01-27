import { ObjectType, Field } from 'type-graphql';

import { PaginationSchema } from './associations/PaginationSchema';

@ObjectType()
class PopularAnimeData {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  category_name!: string;

  @Field(() => String)
  category_image!: string;
}

@ObjectType()
export class PopularAnimeSchema extends PaginationSchema {
  @Field(() => [PopularAnimeData])
  data!: PopularAnimeData[];
}
