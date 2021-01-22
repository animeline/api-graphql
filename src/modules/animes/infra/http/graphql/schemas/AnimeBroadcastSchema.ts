import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class AnimeBroadcastSchema {
  @Field()
  video_id!: string;

  @Field()
  category_id!: string;

  @Field()
  location!: string;

  @Field()
  locationsd!: string;

  @Field()
  locationhd!: string;
}
