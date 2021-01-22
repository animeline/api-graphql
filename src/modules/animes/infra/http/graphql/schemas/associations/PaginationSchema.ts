import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class PaginationSchema {
  @Field(() => Int)
  currentPage!: number;

  @Field(() => Int)
  pageSize!: number;

  @Field(() => Int)
  totalPages!: number;

  @Field(() => Int)
  startPage!: number;

  @Field(() => Int)
  endPage!: number;

  @Field(() => Int)
  startIndex!: number;

  @Field(() => Int)
  endIndex!: number;

  @Field(() => [Int])
  pages!: number[];
}
