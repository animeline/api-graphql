import { Resolver, Query, Arg } from 'type-graphql';
import { container } from 'tsyringe';

import {
  GetNextEpisodeFromAnimeResponseDTO,
  GetNextEpisodeFromAnimeUseCase,
} from '@modules/animes/useCases/GetNextEpisodeFromAnime';

import { NextAnimeEpisodeSchema } from '../schemas/NextAnimeEpisodeSchema';

@Resolver()
class NextAnimeEpisodeResolver {
  @Query(() => NextAnimeEpisodeSchema, {
    name: 'nextAnimeEpisode',
    description: 'Search for the next episode',
  })
  async findByNextEpisode(
    @Arg('currentEpisode') currentEpisode: string,
    @Arg('anime') anime: string,
  ): Promise<GetNextEpisodeFromAnimeResponseDTO> {
    const useCase = container.resolve(GetNextEpisodeFromAnimeUseCase);

    return await useCase.execute({ currentEpisode, anime });
  }
}

export default NextAnimeEpisodeResolver;
