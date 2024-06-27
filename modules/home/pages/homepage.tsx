"use client";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { MovieData } from "../types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export type ErrorResponse = {
  detail: string;
};

export default function HomePage() {
  const [movieData, setMovieData] = useState<MovieData>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
      setLoading(false);
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchMovieData = async () => {
      try {
        const movies = await fetchMovies();
        setMovieData(movies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-between space-y-10 m-12">
      {movieData?.results.map((movie) => {
        return (
            <Card className="" key={`${movie.id}`}>
              <CardTitle>{movie.title}</CardTitle>
              <CardContent>
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt="img"
                  height={400}
                  width={350}
                />
              </CardContent>
              <CardFooter>{movie.release_date}</CardFooter>
            </Card>
        );
      })}
    </div>
  );
}
