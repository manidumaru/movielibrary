import MoviePage from "../../../../modules/movie/pages/moviepage";
import axios from "axios";
import { Movie } from "@/types/movie-type";

export type MovieProps = {
  params: {
    movie: string
  }
};

export default async function IndividualMovie({params}: MovieProps) {
  const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${params.movie}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    }
  })

  const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${params.movie}/credits?language=en-US`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
  })

  const movieResult = movieResponse.data
  const castResult = castResponse.data.cast


  return <MoviePage movieData={movieResult} castData={castResult} />;
}

export async function generateStaticParams() {
  const movies = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    }
  );
  const response = await movies.data.results;

  return response.map((movie: Movie) => ({
    id: movie.id.toString(),
  }));
}
