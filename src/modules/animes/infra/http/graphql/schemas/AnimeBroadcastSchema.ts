import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class AnimeBroadcastSchema {
  @Field(() => String)
  video_id!: string;

  @Field(() => String)
  category_id!: string;

  @Field(() => String)
  location!: string;

  @Field(() => String)
  locationsd!: string;

  @Field(() => String)
  locationhd!: string;
}
