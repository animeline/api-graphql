import { ObjectType, Field } from 'type-graphql';

import { PaginationSchema } from './associations/PaginationSchema';

@ObjectType()
class SearchAnimeData {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  category_name!: string;

  @Field(() => String)
  category_image!: string;
}

@ObjectType()
export class SearchAnimeSchema extends PaginationSchema {
  @Field(() => [SearchAnimeData])
  data!: SearchAnimeData[];
}
