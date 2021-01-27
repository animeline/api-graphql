import { ObjectType, Field } from 'type-graphql';

import { PaginationSchema } from './associations/PaginationSchema';

@ObjectType()
class LatestData {
  @Field(() => String)
  video_id!: string;

  @Field(() => String)
  category_id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  category_image!: string;
}

@ObjectType()
export class LatestAnimesSchema extends PaginationSchema {
  @Field(() => [LatestData])
  data!: LatestData[];
}
