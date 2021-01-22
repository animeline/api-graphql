import { ObjectType, Field } from "type-graphql";

import { PaginationSchema } from './associations/PaginationSchema';

@ObjectType()
class AnimeByLetterData {
  @Field()
  id!: string;

  @Field()
  category_name!: string;

  @Field()
  category_image!: string;
}

@ObjectType()
export class AnimeByLetterSchema extends PaginationSchema {  
  @Field(() => [AnimeByLetterData])
  data!: AnimeByLetterData[];
}
