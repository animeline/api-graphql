import { IAnimesData, ILastAnimes } from '@shared/types';

export interface GetLatestAnimeResponseDTO extends IAnimesData<ILastAnimes[]> {}
