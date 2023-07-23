export interface IReducer {
  type: string;
  payload?: any;
}

export interface Film {
  id: number;
  img: string;
  title: string;
  description?: string;
}
export interface CardFilm extends Film {
  newep?: number;
  status?: string;
  type?: string;
}

export interface TopFilm extends CardFilm {
  view: number;
}

export interface Trending extends TopFilm {
  totalep: number;
}

export interface ISeries {
  id: number;
  title: string;
  description: string;
  total_episodes: number;
  type: string;
  view: number;
  images: IImages[];
  status: string;
  alt_title?: string;
}

export interface IImages {
  id: number;
  name: string;
  type: string;
  id_series: string[];
}

export interface IEpisodes {
  id: number;
  title: string;
  ep_num: number;
  source: string;
  seriesId: number;
}

export interface IAccount {
  id: number;
  email: string;
  username: string;
  password: string;
}
