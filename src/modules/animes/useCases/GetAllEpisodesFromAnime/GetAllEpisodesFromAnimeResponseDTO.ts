import { IAnimesData, IAnimeEpisodes } from '@shared/types';

export interface GetAllEpisodesFromAnimeResponseDTO
  extends IAnimesData<IAnimeEpisodes[]> {}
