import { Resolver, Query, Arg } from 'type-graphql';
import { container } from 'tsyringe';

import {
  GetBroadcastFromAnimeResponseDTO,
  GetBroadcastFromAnimeUseCase,
} from '@modules/animes/useCases/GetBroadcastFromAnime';

import { AnimeBroadcastSchema } from '../schemas/AnimeBroadcastSchema';

@Resolver()
class AnimeBroadcastResolver {
  @Query(() => AnimeBroadcastSchema, {
    name: 'animeBroadcast',
    description: "Fetch an episode's streaming data.",
  })
  async findStreamingEpisodeById(
    @Arg('id') id: string,
  ): Promise<GetBroadcastFromAnimeResponseDTO> {
    const useCase = container.resolve(GetBroadcastFromAnimeUseCase);

    return await useCase.execute({ id });
  }
}

export default AnimeBroadcastResolver;
