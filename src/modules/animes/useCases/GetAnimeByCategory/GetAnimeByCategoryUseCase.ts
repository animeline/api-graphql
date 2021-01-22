import { GraphQLError } from 'graphql';
import { container } from 'tsyringe';

import { AnimeService } from '@modules/animes/domain/services/animeService';
import { IAnimeService } from '@modules/animes/repositories/implementations/IAnimeService';

import categories from '@shared/json/categories.json';
import {
  ANIME_CATEGORY_NOT_FOUND,
  UNEXPECTED_ERROR,
} from '@shared/lib/graphql/error-codes';

import { GetAnimeByCategoryDTO } from './GetAnimeByCategoryDTO';
import { GetAnimeByCategoryResponseDTO } from './GetAnimeByCategoryResponseDTO';

export class GetAnimeByCategoryUseCase {
  constructor(
    private animeService: IAnimeService = container.resolve(AnimeService),
  ) {}

  public async execute({
    category,
    currentPage,
    pageSize,
    maxPages,
  }: GetAnimeByCategoryDTO): Promise<GetAnimeByCategoryResponseDTO> {
    try {
      if (
        !(
          categories.find(ctx => ctx === category) ||
          categories.find(ctx => ctx.toLowerCase() === category.toLowerCase())
        )
      ) {
        throw new GraphQLError(ANIME_CATEGORY_NOT_FOUND);
      }

      return await this.animeService.findByCategory(
        category,
        currentPage,
        pageSize,
        maxPages,
      );
    } catch (error) {
      throw new GraphQLError(error.message || UNEXPECTED_ERROR);
    }
  }
}
