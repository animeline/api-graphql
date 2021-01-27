import { ObjectType, Field } from 'type-graphql';

import { PaginationSchema } from './associations/PaginationSchema';

@ObjectType()
class AllAnimeData {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  category_name!: string;

  @Field(() => String)
  category_image!: string;
}

@ObjectType()
export class AllAnimesSchema extends PaginationSchema {
  @Field(() => [AllAnimeData])
  data!: AllAnimeData[];
}
