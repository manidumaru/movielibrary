import HomePage from "../../../modules/home/pages/homepage";
import axios from "axios";

export default async function MainHome() {
  const trendingMoviesResponse = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    }
  );
  const trendingDataResult = trendingMoviesResponse.data.results;

  const movieListResponse = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    }
  );
  const movieDataResult = movieListResponse.data;

  const tvListResponse = await axios.get(
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    }
  );
  const tvDataResult = tvListResponse.data.results;

  return (
    <HomePage
      trendingData={trendingDataResult}
      movieListData={movieDataResult}
      tvListData={tvDataResult}
    />
  );
}
