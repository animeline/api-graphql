import { GraphQLError } from 'graphql';
import { container } from 'tsyringe';

import { AnimeService } from '@modules/animes/domain/services/animeService';
import { IAnimeService } from '@modules/animes/repositories/implementations/IAnimeService';

import { UNEXPECTED_ERROR } from '@shared/lib/graphql/error-codes';

import { GetPopularAnimeDTO } from './GetPopularAnimeDTO';
import { GetPopularAnimeResponseDTO } from './GetPopularAnimeResponseDTO';

export class GetPopularAnimeUseCase {
  constructor(
    private animeService: IAnimeService = container.resolve(AnimeService),
  ) {}

  public async execute({
    currentPage,
    pageSize,
    maxPages,
  }: GetPopularAnimeDTO): Promise<GetPopularAnimeResponseDTO> {
    try {
      return await this.animeService.findAllPopular(
        currentPage,
        pageSize,
        maxPages,
      );
    } catch (error) {
      throw new GraphQLError(error.message || UNEXPECTED_ERROR);
    }
  }
}
