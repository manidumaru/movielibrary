"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useSetAtom } from "jotai";
import { Movie } from "@/types/movie-type";
import { Poppins } from "next/font/google";

import { Bookmark } from "lucide-react";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { loadingTrendingAtom } from "../atoms/home-atoms";

const poppins = Poppins({ weight: "300", subsets: ["latin"] });

export default function TrendindSection() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>();
  const setLoading = useSetAtom(loadingTrendingAtom)

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
      setLoading(false)
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
    <Carousel className="w-full cursor-grab">
      <CarouselContent className="h-[650px]">
        {trendingMovies?.slice(0, 10)?.map((movie) => {
          return (
            <CarouselItem
              key={`${movie.id}`}
              className="relative flex items-end"
            >
              <div className={`p-4 sm:p-8 md:p-16 lg:p-20 flex flex-col gap-3 ${poppins.className}`}>
                <p className="text-[30px] md:text-[48px]">{movie.title}</p>
                <div className="flex gap-4 justify-start items-center">
                  <p>{`${movie.vote_average.toPrecision(2)}`}</p>
                  <p>{movie.release_date}</p>
                  <Badge className="bg-primary">Movie</Badge>
                  <Badge className="bg-primary">
                    {movie.original_language.toUpperCase()}
                  </Badge>
                </div>
                <div className="w-[200px] sm:w-[300px] md:w-[500px] lg:w-[700px] xl:w-[900px]">
                  <p className="opacity-70 text-sm hidden lg:block">{movie.overview}</p>
                </div>
                <div className="flex gap-4">
                  <Link href={`/movie/${movie.id}`}><Button>Read more</Button></Link>
                  <Button variant="ghost">
                    <Bookmark height={20} width={20} className="mr-2" />
                    Bookmark
                  </Button>
                </div>
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
