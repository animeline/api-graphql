import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
class Latest {  
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
class LatestAnimes {
  @Field(() => Int)
  page!: number;

  @Field(() => Int)
  perPage!: number;

  @Field(() => Int)
  total!: number;

  @Field(() => Int)
  totalPages!: number;

  @Field(() => [Latest])
  data!: Latest[];
}

export default LatestAnimes;
