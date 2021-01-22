import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 1 })
  currentPage!: number;

  @Field(() => Int, { defaultValue: 12 })
  pageSize!: number;

  @Field(() => Int, { defaultValue: 12 })
  maxPages!: number;
}
