import { ObjectType, Field } from 'type-graphql';

import { PaginationSchema } from './associations/PaginationSchema';

@ObjectType()
class PopularAnimeData {
  @Field()
  id!: string;

  @Field()
  category_name!: string;

  @Field()
  category_image!: string;
}

@ObjectType()
export class PopularAnimeSchema extends PaginationSchema {
  @Field(() => [PopularAnimeData])
  data!: PopularAnimeData[];
}
