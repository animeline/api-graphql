import { Resolver, Query, Args } from 'type-graphql';
import { container } from 'tsyringe';

import {
  GetAllAnimesResponseDTO,
  GetAllAnimesUseCase,
} from '@modules/animes/useCases/GetAllAnimes';

import { PaginationArgs } from '../args/PaginationArgs';

import { AllAnimesSchema } from '../schemas/AllAnimesSchema';

@Resolver()
class AllAnimesResolver {
  @Query(() => AllAnimesSchema, {
    name: 'allAnimes',
    description: 'Fetch data from all anime.',
  })
  async findAll(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<GetAllAnimesResponseDTO> {
    const useCase = container.resolve(GetAllAnimesUseCase);
    const animes = await useCase.execute(paginationArgs);

    return animes;
  }
}

export default AllAnimesResolver;
