import { ObjectType, Field } from 'type-graphql';

import { PaginationSchema } from './associations/PaginationSchema';

@ObjectType()
class AnimeEpisodesData {
  @Field(() => String)
  video_id!: string;

  @Field(() => String)
  category_id!: string;

  @Field(() => String)
  title!: string;
}

@ObjectType()
export class AnimeEpisodesSchema extends PaginationSchema {
  @Field(() => [AnimeEpisodesData])
  data!: AnimeEpisodesData[];
}
