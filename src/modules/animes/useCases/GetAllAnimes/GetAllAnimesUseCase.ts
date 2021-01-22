import { GraphQLError } from 'graphql';
import { container } from 'tsyringe';

import { AnimeService } from '@modules/animes/domain/services/animeService';
import { IAnimeService } from '@modules/animes/repositories/implementations/IAnimeService';

import { UNEXPECTED_ERROR } from '@shared/lib/graphql/error-codes';

import { GetAllAnimesDTO } from './GetAllAnimesDTO';
import { GetAllAnimesResponseDTO } from './GetAllAnimesResponseDTO';

export class GetAllAnimesUseCase {
  constructor(
    private animeService: IAnimeService = container.resolve(AnimeService),
  ) {}

  public async execute({
    currentPage,
    pageSize,
    maxPages,
  }: GetAllAnimesDTO): Promise<GetAllAnimesResponseDTO> {
    try {
      return await this.animeService.findAll(currentPage, pageSize, maxPages);
    } catch (error) {
      throw new GraphQLError(error.message || UNEXPECTED_ERROR);
    }
  }
}
