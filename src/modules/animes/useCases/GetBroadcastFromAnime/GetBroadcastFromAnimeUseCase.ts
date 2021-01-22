import { GraphQLError } from 'graphql';
import { container } from 'tsyringe';

import { AnimeService } from '@modules/animes/domain/services/animeService';
import { IAnimeService } from '@modules/animes/repositories/implementations/IAnimeService';

import { UNEXPECTED_ERROR } from '@shared/lib/graphql/error-codes';

import { GetBroadcastFromAnimeDTO } from './GetBroadcastFromAnimeDTO';
import { GetBroadcastFromAnimeResponseDTO } from './GetBroadcastFromAnimeResponseDTO';

export class GetBroadcastFromAnimeUseCase {
  constructor(
    private animeService: IAnimeService = container.resolve(AnimeService),
  ) {}

  public async execute({
    id,
  }: GetBroadcastFromAnimeDTO): Promise<GetBroadcastFromAnimeResponseDTO> {
    try {
      return await this.animeService.findStreamingEpisodeById(id);
    } catch (error) {
      throw new GraphQLError(error.message || UNEXPECTED_ERROR);
    }
  }
}
