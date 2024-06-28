"use client";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { MovieData } from "../types/types";
import { StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { dotSpinner } from "ldrs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/ui/loader";

export type ErrorResponse = {
  detail: string;
};

dotSpinner.register();

export default function MovieListSection() {
  const [movieData, setMovieData] = useState<MovieData>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
          },
        }
      );
      const data = response.data;
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
    return <Loader size={50} color="white" />
  }
  return (
    <>
      <div className="flex flex-wrap justify-center space-y-10">
        {movieData?.results.map((movie) => {
          return (
            <Link
              className="mt-10 mx-2"
              href={`/movie/${movie.id}`}
              key={`${movie.id}`}
            >
              <Card>
                <CardContent className="relative w-full h-[320px] mb-4">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt="Movie Image"
                    fill={true}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={true}
                  />
                </CardContent>
                <CardTitle>
                  <p className="text-ellipsis overflow-hidden w-full truncate">
                    {movie.title}
                  </p>
                </CardTitle>
                <CardHeader className="flex flex-row justify-start items-center gap-2">
                  <StarIcon
                    height={16}
                    width={16}
                    fill="yellow"
                    stroke="yellow"
                  />
                  <p>{`${movie.vote_average.toPrecision(2)}`}</p>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  {movie.release_date}{" "}
                  <Badge variant={"default"} className="opacity-60">
                    Movie
                  </Badge>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
