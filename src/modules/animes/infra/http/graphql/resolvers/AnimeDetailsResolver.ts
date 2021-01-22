import { container } from 'tsyringe';
import { Resolver, Query, Arg, Args } from 'type-graphql';

import {
  GetAnimeByIdResponseDTO,
  GetAnimeByIdUseCase,
} from '@modules/animes/useCases/GetAnimeById';

import { PaginationArgs } from '../args/PaginationArgs';
import { AnimeDetailsSchema } from '../schemas/AnimeDetailsSchema';

@Resolver()
class AnimeDetailsResolver {
  @Query(() => AnimeDetailsSchema, {
    name: 'animeDetails',
    description: 'Get the details of an anime.',
  })
  async findById(
    @Arg('id') id: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<GetAnimeByIdResponseDTO> {
    const useCase = container.resolve(GetAnimeByIdUseCase);

    return await useCase.execute({ id, ...paginationArgs });
  }
}

export default AnimeDetailsResolver;
