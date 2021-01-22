import { GraphQLError } from 'graphql';
import { container } from 'tsyringe';

import { AnimeService } from '@modules/animes/domain/services/animeService';
import { IAnimeService } from '@modules/animes/repositories/implementations/IAnimeService';

import letters from '@shared/json/categories.json';
import {
  ANIME_LETTER_NOT_FOUND,
  UNEXPECTED_ERROR,
} from '@shared/lib/graphql/error-codes';

import { GetAnimeByLetterDTO } from './GetAnimeByLetterDTO';
import { GetAnimeByLetterResponseDTO } from './GetAnimeByLetterResponseDTO';

export class GetAnimeByLetterUseCase {
  constructor(
    private animeService: IAnimeService = container.resolve(AnimeService),
  ) {}

  public async execute({
    letter,
    currentPage,
    pageSize,
    maxPages,
  }: GetAnimeByLetterDTO): Promise<GetAnimeByLetterResponseDTO> {
    try {
      if (
        !(
          letters.find(ctx => ctx === letter) ||
          letters.find(ctx => ctx.toLowerCase() === letter.toLowerCase())
        )
      ) {
        throw new GraphQLError(ANIME_LETTER_NOT_FOUND);
      }

      return await this.animeService.findByLetter(
        letter,
        currentPage,
        pageSize,
        maxPages,
      );
    } catch (error) {
      throw new GraphQLError(error.message || UNEXPECTED_ERROR);
    }
  }
}
