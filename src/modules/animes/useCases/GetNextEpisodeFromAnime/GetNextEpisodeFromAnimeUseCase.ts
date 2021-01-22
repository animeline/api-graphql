import { GraphQLError } from 'graphql';
import { container } from 'tsyringe';

import { AnimeService } from '@modules/animes/domain/services/animeService';
import { IAnimeService } from '@modules/animes/repositories/implementations/IAnimeService';

import { UNEXPECTED_ERROR } from '@shared/lib/graphql/error-codes';

import { GetNextEpisodeFromAnimeDTO } from './GetNextEpisodeFromAnimeDTO';
import { GetNextEpisodeFromAnimeResponseDTO } from './GetNextEpisodeFromAnimeResponseDTO';

export class GetNextEpisodeFromAnimeUseCase {
  constructor(
    private animeService: IAnimeService = container.resolve(AnimeService),
  ) {}

  public async execute({
    currentEpisode,
    anime,
  }: GetNextEpisodeFromAnimeDTO): Promise<GetNextEpisodeFromAnimeResponseDTO> {
    try {
      return await this.animeService.findByNextEpisode(currentEpisode, anime);
    } catch (error) {
      throw new GraphQLError(error.message || UNEXPECTED_ERROR);
    }
  }
}
