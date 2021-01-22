import { container } from 'tsyringe';
import { Resolver, Query, Arg, Args } from 'type-graphql';

import {
  GetAnimeByCategoryResponseDTO,
  GetAnimeByCategoryUseCase,
} from '@modules/animes/useCases/GetAnimeByCategory';

import { PaginationArgs } from '../args/PaginationArgs';
import { AnimeByCategorySchema } from '../schemas/AnimeByCategorySchema';

@Resolver()
class AnimeByCategoryResolver {
  @Query(() => AnimeByCategorySchema, {
    name: 'animeByCategory',
    description: 'Search anime data by category.',
  })
  async findByCategory(
    @Arg('category') category: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<GetAnimeByCategoryResponseDTO> {
    const useCase = container.resolve(GetAnimeByCategoryUseCase);

    return await useCase.execute({ category, ...paginationArgs });
  }
}

export default AnimeByCategoryResolver;
