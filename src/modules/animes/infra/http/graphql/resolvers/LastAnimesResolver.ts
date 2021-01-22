import { Resolver, Query, Args } from 'type-graphql';
import { container } from 'tsyringe';

import {
  GetLatestAnimeResponseDTO,
  GetLatestAnimeUseCase,
} from '@modules/animes/useCases/GetLatestAnime';

import { PaginationArgs } from '../args/PaginationArgs';

import { LatestAnimesSchema } from '../schemas/LatestAnimesSchema';

@Resolver()
class LastAnimesResolver {
  @Query(() => LatestAnimesSchema, {
    name: 'lastAnimes',
    description: 'Fetch the data of the last released anime.',
  })
  async findByLatest(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<GetLatestAnimeResponseDTO> {
    const useCase = container.resolve(GetLatestAnimeUseCase);
    const animes = await useCase.execute(paginationArgs);

    return animes;
  }
}

export default LastAnimesResolver;
