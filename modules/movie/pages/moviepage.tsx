"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IndividualMovie } from "@/types/movie-type";
import Loader from "@/components/ui/loader";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { minutesToHours, formatLargeNumber } from "@/lib/utils";

export default function MoviePage() {
  const [movieData, setMovieData] = useState<IndividualMovie>();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const pathname = usePathname();
  const movie = useMemo(() => {
    const segments = pathname.split("/");
    return segments[segments.length - 1];
  }, [pathname]);

  const fetchCastData = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie}/credits?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
      });
      const result = response.data
      return result
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMovieData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie}`,
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await fetchMovieData();
        setMovieData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-dvh w-dvw flex flex-col gap-4 justify-center items-center">
        <Loader size={80} color="white" />
        <p>Fetching movie...</p>
      </div>
    );
  }

  return (
    <div className="relative h-dvh w-dvw">
      {!imageLoaded && (
        <div className="absolute h-dvh w-dvw flex flex-col gap-4 justify-center items-center z-9999">
          <Loader size={80} color="white" />
          <p>Fetching movie...</p>
        </div>
      )}
      <Image
        src={`https://image.tmdb.org/t/p/original/${movieData?.backdrop_path}`}
        alt=""
        fill={true}
        className={`opacity-20 -z-10 object-cover ${
          imageLoaded ? "block" : "hidden"
        }`}
        priority
        onLoadingComplete={() => setImageLoaded(true)}
      />
      <div
        className={`flex flex-col items-start md:flex-row md:h-dvh md:w-dvw md:justify-center sm:items-center ${
          !imageLoaded && "hidden"
        }`}
      >
        <Image
          src={`https://image.tmdb.org/t/p/original/${movieData?.poster_path}`}
          alt=""
          width={350}
          height={349}
          className="self-center"
        />
        <div className="flex flex-col gap-2 md:pl-14 md:self-center px-8 py-8 sm:px-16 md:px-0 md:max-w-[600px]">
          <p className="text-[24px] md:text-[40px] font-bold">
            {movieData?.title}
            <p className="text-xs font-normal">{movieData?.tagline}</p>
          </p>
          <p>Release Date: {movieData?.release_date}</p>
          <div className="flex justify-center items-center my-3">
            <p className="border border-primary basis-1/2 mr-2 py-4 flex justify-center items-center rounded-lg">
              Rating: {`${movieData?.vote_average.toPrecision(2)}`}
            </p>
            <p className="border border-primary basis-1/2 ml-2 py-4 flex justify-center items-center rounded-lg">
              Runtime: {`${minutesToHours(movieData?.runtime as number)}`}
            </p>
          </div>
          <div className="flex gap-2">
            {movieData?.genres.map((genre) => {
              return <Badge key={`${genre.id}`}>{genre.name}</Badge>;
            })}
          </div>
          <p>{movieData?.overview}</p>
          <div className="flex justify-center items-center my-3">
            <p className="bg-primary text-black basis-1/2 mr-2 py-4 flex justify-center items-center rounded-lg">
              Budget: {`${formatLargeNumber(movieData?.budget as number)}`}
            </p>
            <p className="bg-primary text-black basis-1/2 ml-2 py-4 flex justify-center items-center rounded-lg">
              Revenue: {`${formatLargeNumber(movieData?.revenue as number)}`}
            </p>
          </div>
          <div className="company flex gap-2">
            {movieData?.production_companies.map((company) => {
              return (
                <span key={`${company.id}`} className="text-xs">
                  {company.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
