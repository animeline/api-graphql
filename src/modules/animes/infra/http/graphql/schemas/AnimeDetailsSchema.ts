import { ObjectType, Field } from 'type-graphql';

import { PaginationSchema } from './associations/PaginationSchema';

@ObjectType()
class EpisodeData {
  @Field(() => String)
  video_id!: string;

  @Field(() => String)
  category_id!: string;

  @Field(() => String)
  title!: string;
}

@ObjectType()
class AllEpisodesData extends PaginationSchema {
  @Field(() => [EpisodeData])
  data!: EpisodeData[];
}

@ObjectType()
export class AnimeDetailsSchema {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  category_name!: string;

  @Field({ nullable: true })
  category_image!: string;

  @Field(() => String)
  category_description!: string;

  @Field(() => String)
  category_genres!: string;

  @Field(() => String)
  ano!: string;

  @Field(() => String)
  count!: string;

  @Field(() => String)
  off!: string;

  @Field(() => AllEpisodesData)
  episodes!: AllEpisodesData;
}
