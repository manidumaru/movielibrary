type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Number[];
  id: Number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: Number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: Number;
  vote_count: Number;
};

type MovieData = {
  page: Number;
  results: Movie[];
  total_pages: Number;
  total_results: Number;
};

export type { Movie, MovieData };
