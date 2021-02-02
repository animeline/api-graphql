import paginate from 'jw-paginate';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

import { apiConfig } from '@config';

import { IAnimeService } from '@modules/animes/repositories/implementations/IAnimeService';
import {
  IAnimesData,
  IAllAnimes,
  IPopularAnime,
  ILastAnimes,
  IAnimeByCategory,
  IAnimeByLetter,
  ISearchAnime,
  IAnimeDetails,
  IAnimeEpisodes,
  IAnimeBroadcast,
  IAnimeNextEpisode,
  IAnimePreviousEpisode,
} from '@modules/animes/types';

import {
  ANIME_CATEGORY_NOT_FOUND,
  ANIME_NOT_FOUND,
  DATA_NOT_FOUND,
} from '@shared/lib/graphql/error-codes';

const BASE_URL = apiConfig.api;
const CND_URL = apiConfig.cdn;
const ENDPOINT_API = '/api-animesbr-10.php';

export class AnimeService implements IAnimeService {
  public async findAll(
    currentPage: number,
    pageSize: number,
    maxPages: number,
  ): Promise<IAnimesData<IAllAnimes[]>> {
    const data = await this.request<IAllAnimes[]>();

    if (data === null) {
      throw new Error(DATA_NOT_FOUND);
    }

    const pager = paginate(data.length, currentPage, pageSize, maxPages);

    return {
      ...pager,
      data: data.slice(pager.startIndex, pager.endIndex + 1).map(anime => ({
        category_image: anime.category_image
          ? `${CND_URL}/img/${anime.category_image}`
          : null,
        ...anime,
      })),
    };
  }

  public async findAllPopular(
    currentPage: number,
    pageSize: number,
    maxPages: number,
  ): Promise<IAnimesData<IPopularAnime[]>> {
    const data = await this.request<IPopularAnime[]>({ populares: '' });

    if (data === null) {
      throw new Error(DATA_NOT_FOUND);
    }

    const pager = paginate(data.length, currentPage, pageSize, maxPages);

    return {
      ...pager,
      data: data.slice(pager.startIndex, pager.endIndex + 1).map(anime => ({
        category_image: anime.category_image
          ? `${CND_URL}/img/${anime.category_image}`
          : null,
        ...anime,
      })),
    };
  }

  public async findByLatest(
    currentPage: number,
    pageSize: number,
    maxPages: number,
  ): Promise<IAnimesData<ILastAnimes[]>> {
    const data = await this.request<ILastAnimes[]>({ latest: '' });

    if (data === null) {
      throw new Error(DATA_NOT_FOUND);
    }

    const pager = paginate(data.length, currentPage, pageSize, maxPages);

    return {
      ...pager,
      data: data.slice(pager.startIndex, pager.endIndex + 1).map(anime => ({
        category_image: anime.category_image
          ? `${CND_URL}/img/${anime.category_image}`
          : null,
        ...anime,
      })),
    };
  }

  public async findByCategory(
    category: string,
    currentPage: number,
    pageSize: number,
    maxPages: number,
  ): Promise<IAnimesData<IAnimeByCategory[]>> {
    const data = await this.request<IAnimeByCategory[]>({
      categoria: category,
    });

    if (data === null) {
      throw new Error(ANIME_CATEGORY_NOT_FOUND);
    }

    const pager = paginate(data.length, currentPage, pageSize, maxPages);

    return {
      ...pager,
      data: data.slice(pager.startIndex, pager.endIndex + 1).map(anime => ({
        category_image: anime.category_image
          ? `${CND_URL}/img/${anime.category_image}`
          : null,
        ...anime,
      })),
    };
  }

  public async findByLetter(
    letter: string,
    currentPage: number,
    pageSize: number,
    maxPages: number,
  ): Promise<IAnimesData<IAnimeByLetter[]>> {
    const data = await this.request<IAnimeByLetter[]>({ letra: letter });

    if (data === null) {
      throw new Error(DATA_NOT_FOUND);
    }

    const pager = paginate(data.length, currentPage, pageSize, maxPages);

    return {
      ...pager,
      data: data.slice(pager.startIndex, pager.endIndex + 1).map(anime => ({
        category_image: anime.category_image
          ? `${CND_URL}/img/${anime.category_image}`
          : null,
        ...anime,
      })),
    };
  }

  public async findByName(
    name: string,
    currentPage: number,
    pageSize: number,
    maxPages: number,
  ): Promise<IAnimesData<ISearchAnime[]>> {
    const data = await this.request<ISearchAnime[]>({ search: name });

    if (data === null) {
      throw new Error(DATA_NOT_FOUND);
    }

    const pager = paginate(data.length, currentPage, pageSize, maxPages);

    return {
      ...pager,
      data: data.slice(pager.startIndex, pager.endIndex + 1).map(anime => ({
        category_image: anime.category_image
          ? `${CND_URL}/img/${anime.category_image}`
          : null,
        ...anime,
      })),
    };
  }

  public async findById(
    id: string,
    currentPage: number,
    pageSize: number,
    maxPages: number,
  ): Promise<IAnimeDetails> {
    const responses = await Promise.all([
      this.request<IAnimeDetails>({ info: id }),
      this.request<IAnimeEpisodes[]>({ cat_id: id }),
    ]);

    const [anime, episodes] = responses;

    if (anime === null && episodes === null) {
      throw new Error(ANIME_NOT_FOUND);
    }

    const pager = paginate(episodes.length, currentPage, pageSize, maxPages);

    return {
      ...anime[0],
      category_image: anime[0].category_image
        ? `${CND_URL}/img/${anime[0].category_image}`
        : null,
      episodes: {
        ...pager,
        data: episodes.slice(pager.startIndex, pager.endIndex + 1),
      },
    };
  }

  public async findAllEpisodes(
    id: string,
    currentPage: number,
    pageSize: number,
    maxPages: number,
  ): Promise<IAnimesData<IAnimeEpisodes[]>> {
    const data = await this.request<IAnimeEpisodes[]>({ cat_id: id });

    if (data === null) {
      throw new Error(DATA_NOT_FOUND);
    }

    const pager = paginate(data.length, currentPage, pageSize, maxPages);

    return {
      ...pager,
      data: data.slice(pager.startIndex, pager.endIndex + 1),
    };
  }

  public async findStreamingEpisodeById(id: string): Promise<IAnimeBroadcast> {
    const data = await this.request<IAnimeBroadcast[]>({ episodios: id });

    if (data === null) {
      throw new Error(DATA_NOT_FOUND);
    }

    return data[0];
  }

  public async findByNextEpisode(
    currentEpisode: string,
    anime: string,
  ): Promise<IAnimeNextEpisode> {
    const data = await this.request<IAnimeNextEpisode[]>({
      episodios: currentEpisode,
      catid: anime,
      next: '',
    });

    if (data === null) {
      throw new Error(DATA_NOT_FOUND);
    }

    return data[0];
  }

  public async findByPreviousEpisode(
    currentEpisode: string,
    anime: string,
  ): Promise<IAnimePreviousEpisode> {
    const data = await this.request<IAnimePreviousEpisode[]>({
      episodios: currentEpisode,
      catid: anime,
      previous: '',
    });

    if (data === null) {
      throw new Error(DATA_NOT_FOUND);
    }

    return data[0];
  }

  public async request<RequestType>(query = {}): Promise<RequestType> {
    const params = new URLSearchParams(query);

    return fetch(`${BASE_URL + ENDPOINT_API}?${params.toString()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json() as Promise<RequestType>;
      })
      .then(data => {
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
