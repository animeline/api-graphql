import { ObjectType, Field } from 'type-graphql';

import { PaginationSchema } from './associations/PaginationSchema';

@ObjectType()
class SearchAnimeData {
  @Field()
  id!: string;

  @Field()
  category_name!: string;

  @Field()
  category_image!: string;
}

@ObjectType()
export class SearchAnimeSchema extends PaginationSchema {
  @Field(() => [SearchAnimeData])
  data!: SearchAnimeData[];
}
