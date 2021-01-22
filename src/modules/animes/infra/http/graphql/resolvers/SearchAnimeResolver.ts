import { Resolver, Query, Arg, Args } from 'type-graphql';
import { container } from 'tsyringe';

import {
  GetAnimeByNameResponseDTO,
  GetAnimeByNameUseCase,
} from '@modules/animes/useCases/GetAnimeByName';

import { PaginationArgs } from '../args/PaginationArgs';

import { SearchAnimeSchema } from '../schemas/SearchAnimeSchema';

@Resolver()
class AnimeByLatterResolver {
  @Query(() => SearchAnimeSchema, {
    name: "searchAnime",
    description: "Search anime data by name.",
  })
  async findByName(
    @Arg('name') name: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<GetAnimeByNameResponseDTO> {
    const useCase = container.resolve(GetAnimeByNameUseCase);

    return await useCase.execute({ name, ...paginationArgs });
  }
}

export default AnimeByLatterResolver;
