import { IAnimesData, IAllAnimes } from '@shared/types';

export interface GetAllAnimesResponseDTO
  extends IAnimesData<IAllAnimes[]> {}
