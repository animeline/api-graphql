import { ObjectType, Field } from 'type-graphql';

import { PaginationSchema } from './associations/PaginationSchema';

@ObjectType()
class AnimeByLetterData {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  category_name!: string;

  @Field(() => String)
  category_image!: string;
}

@ObjectType()
export class AnimeByLetterSchema extends PaginationSchema {
  @Field(() => [AnimeByLetterData])
  data!: AnimeByLetterData[];
}
