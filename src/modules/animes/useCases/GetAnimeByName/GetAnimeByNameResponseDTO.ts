import { IAnimesData, ISearchAnime } from '@shared/types';

export interface GetAnimeByNameResponseDTO
  extends IAnimesData<ISearchAnime[]> {}
