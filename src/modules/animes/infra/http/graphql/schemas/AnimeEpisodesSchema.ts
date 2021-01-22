import { ObjectType, Field } from 'type-graphql';

import { PaginationSchema } from './associations/PaginationSchema';

@ObjectType()
class AnimeEpisodesData {
  @Field()
  video_id!: string;

  @Field()
  category_id!: string;

  @Field()
  title!: string;
}

@ObjectType()
export class AnimeEpisodesSchema extends PaginationSchema {
  @Field(() => [AnimeEpisodesData])
  data!: AnimeEpisodesData[];
}
