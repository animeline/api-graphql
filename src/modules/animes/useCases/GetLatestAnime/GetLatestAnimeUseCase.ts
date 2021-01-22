import { GraphQLError } from 'graphql';
import { container } from 'tsyringe';

import { AnimeService } from '@modules/animes/domain/services/animeService';
import { IAnimeService } from '@modules/animes/repositories/implementations/IAnimeService';

import { UNEXPECTED_ERROR } from '@shared/lib/graphql/error-codes';

import { GetLatestAnimeDTO } from './GetLatestAnimeDTO';
import { GetLatestAnimeResponseDTO } from './GetLatestAnimeResponseDTO';

export class GetLatestAnimeUseCase {
  constructor(
    private animeService: IAnimeService = container.resolve(AnimeService),
  ) {}

  public async execute({
    currentPage,
    maxPages,
    pageSize,
  }: GetLatestAnimeDTO): Promise<GetLatestAnimeResponseDTO> {
    try {
      const animes = await this.animeService.findByLatest(
        currentPage,
        maxPages,
        pageSize,
      );

      return animes;
    } catch (error) {
      throw new GraphQLError(error.message || UNEXPECTED_ERROR);
    }
  }
}
