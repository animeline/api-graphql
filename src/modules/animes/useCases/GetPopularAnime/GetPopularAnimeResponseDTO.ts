import { IAnimesData, IPopularAnime } from '@shared/types';

export interface GetPopularAnimeResponseDTO
  extends IAnimesData<IPopularAnime[]> {}
