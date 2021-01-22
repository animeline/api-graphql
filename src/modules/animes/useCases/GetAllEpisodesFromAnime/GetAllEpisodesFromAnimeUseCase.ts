import { GraphQLError } from 'graphql';
import { container } from 'tsyringe';

import { AnimeService } from '@modules/animes/domain/services/animeService';
import { IAnimeService } from '@modules/animes/repositories/implementations/IAnimeService';

import { UNEXPECTED_ERROR } from '@shared/lib/graphql/error-codes';

import { GetAllEpisodesFromAnimeDTO } from './GetAllEpisodesFromAnimeDTO';
import { GetAllEpisodesFromAnimeResponseDTO } from './GetAllEpisodesFromAnimeResponseDTO';

export class GetAllEpisodesFromAnimeUseCase {
  constructor(
    private animeService: IAnimeService = container.resolve(AnimeService),
  ) {}

  public async execute({
    id,
    currentPage,
    pageSize,
    maxPages,
  }: GetAllEpisodesFromAnimeDTO): Promise<GetAllEpisodesFromAnimeResponseDTO> {
    try {
      return await this.animeService.findAllEpisodes(
        id,
        currentPage,
        pageSize,
        maxPages,
      );
    } catch (error) {
      throw new GraphQLError(error.message || UNEXPECTED_ERROR);
    }
  }
}
