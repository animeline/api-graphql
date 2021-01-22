import { ObjectType, Field } from 'type-graphql';

import { PaginationSchema } from './associations/PaginationSchema';

@ObjectType()
class EpisodeData {
  @Field()
  video_id!: string;

  @Field()
  category_id!: string;

  @Field()
  title!: string;
}

@ObjectType()
class AllEpisodesData extends PaginationSchema {
  @Field(() => [EpisodeData])
  data!: EpisodeData[];
}

@ObjectType()
export class AnimeDetailsSchema {
  @Field()
  id!: string;

  @Field()
  category_name!: string;

  @Field({ nullable: true })
  category_image!: string;

  @Field()
  category_description!: string;

  @Field()
  category_genres!: string;

  @Field()
  ano!: string;

  @Field()
  count!: string;

  @Field()
  off!: string;

  @Field(() => AllEpisodesData)
  episodes!: AllEpisodesData;
}
