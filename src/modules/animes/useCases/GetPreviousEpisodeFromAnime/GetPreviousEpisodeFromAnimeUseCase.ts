import { GraphQLError } from 'graphql';
import { container } from 'tsyringe';

import { AnimeService } from '@modules/animes/domain/services/animeService';
import { IAnimeService } from '@modules/animes/repositories/implementations/IAnimeService';

import { UNEXPECTED_ERROR } from '@shared/lib/graphql/error-codes';

import { GetPreviousEpisodeFromAnimeDTO } from './GetPreviousEpisodeFromAnimeDTO';
import { GetPreviousEpisodeFromAnimeResponseDTO } from './GetPreviousEpisodeFromAnimeResponseDTO';

export class GetPreviousEpisodeFromAnimeUseCase {
  constructor(
    private animeService: IAnimeService = container.resolve(AnimeService),
  ) {}

  public async execute({
    currentEpisode,
    anime,
  }: GetPreviousEpisodeFromAnimeDTO): Promise<GetPreviousEpisodeFromAnimeResponseDTO> {
    try {
      return await this.animeService.findByPreviousEpisode(
        currentEpisode,
        anime,
      );
    } catch (error) {
      throw new GraphQLError(error.message || UNEXPECTED_ERROR);
    }
  }
}
