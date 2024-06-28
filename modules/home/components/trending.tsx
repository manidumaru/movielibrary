"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Movie } from "../types/types";
import { Poppins } from "next/font/google";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";

const poppins = Poppins({ weight: "300", subsets: ["latin"] });

export default function TrendindSection() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>();

  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
          },
        }
      );
      const data = response.data;
      return data.results;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const finalData = await fetchTrendingMovies();
        setTrendingMovies(finalData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Carousel className="w-full">
      <CarouselContent className="h-[650px]">
        {trendingMovies?.map((movie) => {
          return (
            <CarouselItem
              key={`${movie.id}`}
              className="relative flex items-end"
            >
              <div className="p-20 flex flex-col gap-3">
                <p className={`text-[48px] ${poppins.className}`}>
                  {movie.title}
                </p>
                <div className="flex gap-4 justify-start items-center">
                  <p>{`${movie.vote_average.toPrecision(2)}`}</p>
                  <Badge className="bg-blue-400">Movie</Badge>
                  <Badge className="bg-blue-400">{movie.original_language.toUpperCase()}</Badge>
                </div>
                <p className="w-2/5 opacity-60">{movie.overview}</p>
              </div>
              <Image
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt=""
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-top object-cover opacity-50 -z-10"
                quality={100}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2" />
      <CarouselNext className="absolute right-2" />
    </Carousel>
  );
}
