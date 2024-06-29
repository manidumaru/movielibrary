type TVShow = {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: Number[];
  id: Number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: Number;
  poster_path: string;
  vote_average: Number;
  vote_count: Number;
};

type TVShowCreated = {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
};

type TVShowGenre = {
  id: number;
  name: string;
};

type TVEpisodeType = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
};

type TVNetworkType = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type TVProductionCOuntry = {
  iso_3166_1: string;
  name: string;
};

type TVSeasonType = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

type TVShowLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type TVShowDetail = {
  adult: boolean;
  backdrop_path: string;
  created_by: TVShowCreated[];
  episode_run_time: number[];
  first_air_date: string;
  genres: TVShowGenre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TVEpisodeType;
  name: string;
  next_episode_to_air: TVEpisodeType;
  networks: TVNetworkType[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TVNetworkType[];
  production_countries: TVProductionCOuntry[];
  seasons: TVSeasonType[];
  spoken_languages: TVShowLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type { TVShow, TVShowDetail };
