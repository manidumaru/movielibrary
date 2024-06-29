"use client";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { MovieData } from "@/types/movie-type";
import { StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { useAtom, useSetAtom } from "jotai";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import Image from "next/image";
import Link from "next/link";
import {
  loadingMovieListAtom,
  loadingImageLoadAtom,
  currentMoviePageAtom,
} from "../atoms/home-atoms";
import { generateArray } from "@/lib/utils";

export type ErrorResponse = {
  detail: string;
};

export default function MovieListSection() {
  const [movieData, setMovieData] = useState<MovieData>();
  const [currentPage, setCurrentPage] = useAtom(currentMoviePageAtom);
  const setLoading = useSetAtom(loadingMovieListAtom);
  const setImageLoading = useSetAtom(loadingImageLoadAtom);
  const [pages, setPages] = useState<number[]>([]);

  function PaginationSection() {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setCurrentPage((prev) => {
                  return prev - 1;
                });
              }}
            />
          </PaginationItem>
          {pages.map((index) => {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => {
                    setCurrentPage(index);
                  }}
                >
                  {index}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setCurrentPage((prev) => {
                  return prev + 1;
                });
              }}
            />
          </PaginationItem>
        </PaginationContent>
        <p className="flex justify-center items-center p-2">
          Page: {currentPage}
        </p>
      </Pagination>
    );
  }

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage}`,
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
    setPages(generateArray(currentPage))
    const fetchMovieData = async () => {
      try {
        const movies = await fetchMovies();
        setMovieData(movies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieData();
  }, [currentPage, setCurrentPage]);

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
              <Card className="w-[150px] sm:w-[180px] md:w-[220px] lg:w-[256px]">
                <CardContent className="relative w-full h-[171px] sm:h-[205px] md:h-[250px] lg:h-[320px] mb-4">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt="Movie Image"
                    fill={true}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={true}
                    onLoad={() => {
                      setImageLoading(false);
                    }}
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
                  <p className="text-xs md:text-sm">{movie.release_date} </p>
                  <Badge
                    variant={"default"}
                    className="hidden md:block opacity-60"
                  >
                    Movie
                  </Badge>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
        <PaginationSection />
      </div>
    </>
  );
}
