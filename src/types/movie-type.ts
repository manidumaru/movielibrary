
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
  
  type Tbelongs_to_collection = {
    backdrop_path: string;
    id: Number;
    name: string;
    poster_path: string;
  };
  
  type Genre = {
    id: Number;
    name: string;
  };
  
  type TProduction_Company = {
    id: Number;
    logo_path: string;
    name: string;
    origin_country: string;
  };
  
  type TProduction_Country = {
    iso_3166_1: string;
    name: string;
  };
  
  type TLanguage = {
    english_name: string;
    iso_639_1: string;
    name: string;
  };
  
  type IndividualMovie = {
    adult: false;
    backdrop_path: string;
    belongs_to_collection: Tbelongs_to_collection;
    budget: Number;
    genres: Genre[];
    homepage: string;
    id: Number;
    imdb_id: Number;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: Number;
    poster_path: string;
    production_companies: TProduction_Company[];
    production_countries: TProduction_Country[];
    release_date: string;
    revenue: Number;
    runtime: Number;
    spoken_languages: TLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: Number;
    vote_count: Number;
  };

  export type { Movie, MovieData, IndividualMovie }