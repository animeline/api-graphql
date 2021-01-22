import { Resolver, Query, Arg, Args } from 'type-graphql';
import { container } from 'tsyringe';

import {
  GetAnimeByLetterResponseDTO,
  GetAnimeByLetterUseCase,
} from '@modules/animes/useCases/GetAnimeByLetter';

import { PaginationArgs } from '../args/PaginationArgs';

import { AnimeByLetterSchema } from '../schemas/AnimeByLetterSchema';

@Resolver()
class AnimeByLatterResolver {
  @Query(() => AnimeByLetterSchema, {
    name: "animeByLetter",
    description: "Search anime data by letter.",
  })
  async findByLetter(
    @Arg('letter') letter: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<GetAnimeByLetterResponseDTO> {
    const useCase = container.resolve(GetAnimeByLetterUseCase);

    return await useCase.execute({ letter, ...paginationArgs });
  }
}

export default AnimeByLatterResolver;
