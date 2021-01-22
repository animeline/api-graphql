import { ObjectType, Field } from "type-graphql";

import { PaginationSchema } from './associations/PaginationSchema';

@ObjectType()
class AllAnimeData {
  @Field()
  id!: string;

  @Field()
  category_name!: string;

  @Field()
  category_image!: string;
}

@ObjectType()
export class AllAnimesSchema extends PaginationSchema {    
  @Field(() => [AllAnimeData])
  data!: AllAnimeData[];
}
