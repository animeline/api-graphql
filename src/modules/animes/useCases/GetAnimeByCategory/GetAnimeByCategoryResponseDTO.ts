import { IAnimesData, IAnimeByCategory } from '@shared/types';

export interface GetAnimeByCategoryResponseDTO
  extends IAnimesData<IAnimeByCategory[]> {}
