import { Resolver, Query, Arg } from 'type-graphql';
import { container } from 'tsyringe';

import {
  GetPreviousEpisodeFromAnimeResponseDTO,
  GetPreviousEpisodeFromAnimeUseCase,
} from '@modules/animes/useCases/GetPreviousEpisodeFromAnime';

import { PreviousAnimeEpisodeSchema } from '../schemas/PreviousAnimeEpisodeSchema';

@Resolver()
class PreviousAnimeEpisodeResolver {
  @Query(() => PreviousAnimeEpisodeSchema, {
    name: 'previousAnimeEpisode',
    description: 'Search the previous episode',
  })
  async findByPreviousEpisode(
    @Arg('currentEpisode') currentEpisode: string,
    @Arg('anime') anime: string,
  ): Promise<GetPreviousEpisodeFromAnimeResponseDTO> {
    const useCase = container.resolve(GetPreviousEpisodeFromAnimeUseCase);

    return await useCase.execute({ currentEpisode, anime });
  }
}

export default PreviousAnimeEpisodeResolver;
