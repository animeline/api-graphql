import { Resolver, Query, Args } from 'type-graphql';
import { container } from 'tsyringe';

import {
  GetPopularAnimeResponseDTO,
  GetPopularAnimeUseCase,
} from '@modules/animes/useCases/GetPopularAnime';

import { PaginationArgs } from '../args/PaginationArgs';

import { PopularAnimeSchema } from '../schemas/PopularAnimeSchema';

@Resolver()
class PupularAnimeResolver {
  @Query(() => PopularAnimeSchema, {
    name: 'popularAnime',
    description: 'Search for the most popular anime.',
  })
  async findAllPopular(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<GetPopularAnimeResponseDTO> {
    const useCase = container.resolve(GetPopularAnimeUseCase);

    return await useCase.execute(paginationArgs);
  }
}

export default PupularAnimeResolver;
