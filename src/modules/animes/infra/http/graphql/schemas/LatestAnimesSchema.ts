import { ObjectType, Field } from 'type-graphql';

import { PaginationSchema } from './associations/PaginationSchema';

@ObjectType()
class LatestData {
  @Field()
  video_id!: string;

  @Field()
  category_id!: string;

  @Field()
  title!: string;

  @Field()
  category_image!: string;
}

@ObjectType()
export class LatestAnimesSchema extends PaginationSchema {
  @Field(() => [LatestData])
  data!: LatestData[];
}
