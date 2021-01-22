import { GraphQLError } from 'graphql';
import { container } from 'tsyringe';

import { AnimeService } from '@modules/animes/domain/services/animeService';
import { IAnimeService } from '@modules/animes/repositories/implementations/IAnimeService';

import { UNEXPECTED_ERROR } from '@shared/lib/graphql/error-codes';

import { GetAnimeByIdDTO } from './GetAnimeByIdDTO';
import { GetAnimeByIdResponseDTO } from './GetAnimeByIdResponseDTO';

export class GetAnimeByIdUseCase {
  constructor(
    private animeService: IAnimeService = container.resolve(AnimeService),
  ) {}

  public async execute({
    id,
    currentPage,
    pageSize,
    maxPages,
  }: GetAnimeByIdDTO): Promise<GetAnimeByIdResponseDTO> {
    try {
      return await this.animeService.findById(
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
