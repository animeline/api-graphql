import { GraphQLError } from 'graphql';
import { container } from 'tsyringe';

import { AnimeService } from '@modules/animes/domain/services/animeService';
import { IAnimeService } from '@modules/animes/repositories/implementations/IAnimeService';

import { UNEXPECTED_ERROR } from '@shared/lib/graphql/error-codes';

import { GetAnimeByNameDTO } from './GetAnimeByNameDTO';
import { GetAnimeByNameResponseDTO } from './GetAnimeByNameResponseDTO';

export class GetAnimeByNameUseCase {
  constructor(
    private animeService: IAnimeService = container.resolve(AnimeService),
  ) {}

  public async execute({
    name,
    currentPage,
    pageSize,
    maxPages,
  }: GetAnimeByNameDTO): Promise<GetAnimeByNameResponseDTO> {
    try {
      return await this.animeService.findByName(
        name,
        currentPage,
        pageSize,
        maxPages,
      );
    } catch (error) {
      throw new GraphQLError(error.message || UNEXPECTED_ERROR);
    }
  }
}
