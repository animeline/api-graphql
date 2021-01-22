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
} from '@shared/types';

export interface IAnimeService {
  findAll(
    currentPage: number,
    pageSize: number,
    maxPages: number,
  ): Promise<IAnimesData<IAllAnimes[]>>;
  findAllPopular(
    currentPage: number,
    pageSize: number,
    maxPages: number,
  ): Promise<IAnimesData<IPopularAnime[]>>;
  findByLatest(
    currentPage: number,
    pageSize: number,
    maxPages: number,
  ): Promise<IAnimesData<ILastAnimes[]>>;
  findByCategory(
    category: string,
    currentPage: number,
    pageSize: number,
    maxPages: number,
  ): Promise<IAnimesData<IAnimeByCategory[]>>;
  findByLetter(
    letter: string,
    currentPage: number,
    pageSize: number,
    maxPages: number,
  ): Promise<IAnimesData<IAnimeByLetter[]>>;
  findByName(
    name: string,
    currentPage: number,
    pageSize: number,
    maxPages: number,
  ): Promise<IAnimesData<ISearchAnime[]>>;
  findById(
    id: string,
    currentPage: number,
    pageSize: number,
    maxPages: number,
  ): Promise<IAnimeDetails>;
  findAllEpisodes(
    id: string,
    currentPage: number,
    pageSize: number,
    maxPages: number,
  ): Promise<IAnimesData<IAnimeEpisodes[]>>;
  findStreamingEpisodeById(id: string): Promise<IAnimeBroadcast>;
  findByNextEpisode(
    currentEpisode: string,
    anime: string,
  ): Promise<IAnimeNextEpisode>;
  findByPreviousEpisode(
    currentEpisode: string,
    anime: string,
  ): Promise<IAnimePreviousEpisode>;
  request<RequestData>(query?: object): Promise<RequestData>;
}
