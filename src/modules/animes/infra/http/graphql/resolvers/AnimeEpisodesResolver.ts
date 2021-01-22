import { Resolver, Query, Arg, Args } from 'type-graphql';
import { container } from 'tsyringe';

import {
  GetAllEpisodesFromAnimeResponseDTO,
  GetAllEpisodesFromAnimeUseCase,
} from '@modules/animes/useCases/GetAllEpisodesFromAnime';

import { PaginationArgs } from '../args/PaginationArgs';

import { AnimeEpisodesSchema } from '../schemas/AnimeEpisodesSchema';

@Resolver()
class AnimeEpisodesResolver {
  @Query(() => AnimeEpisodesSchema, {
    name: "animeEpisodes",
    description: "Fetch the data of episodes of an anime.",
  })
  async findAllEpisodes(
    @Arg("id") id: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<GetAllEpisodesFromAnimeResponseDTO> {
    const useCase = container.resolve(GetAllEpisodesFromAnimeUseCase);

    return await useCase.execute({ id, ...paginationArgs });
  }
}

export default AnimeEpisodesResolver;
