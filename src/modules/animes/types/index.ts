// data type

export type IAnimesData<DataType> = {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
  data: DataType;
};

// all

export interface IAllAnimes {
  id: string;
  category_name: string;
  category_image: string;
}

export interface ILastAnimes {
  video_id: string;
  category_id: string;
  title: string;
  category_image: string;
}

export interface IPopularAnime {
  id: string;
  category_name: string;
  category_image: string;
}

// search

export interface IAnimeByCategory {
  id: string;
  category_name: string;
  category_image: string;
}

export interface IAnimeByLetter {
  id: string;
  category_name: string;
  category_image: string;
}

export interface ISearchAnime {
  id: string;
  category_name: string;
  category_image: string;
}

// anime

export interface IAnimeEpisodes {
  video_id: string;
  category_id: string;
  title: string;
}

export interface IAnimeBroadcast {
  video_id: string;
  category_id: string;
  location: string;
  locationsd: string;
  locationhd: string;
}

export interface IAnimeNextEpisode {
  video_id: string;
  category_id: string;
  location: string;
  locationsd: string;
  locationhd: string;
}

export interface IAnimePreviousEpisode {
  video_id: string;
  category_id: string;
  location: string;
  locationsd: string;
  locationhd: string;
}

export interface IAnimeDetails {
  id: string;
  category_name: string;
  category_image?: string | null;
  category_description: string;
  category_genres: string;
  ano: string;
  count: string;
  off: string;
  episodes: IAnimesData<IAnimeEpisodes[]>;
}
