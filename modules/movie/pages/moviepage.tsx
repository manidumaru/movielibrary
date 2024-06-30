"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IndividualMovie } from "@/types/movie-type";
import Loader from "@/components/ui/loader";
import Image from "next/image";
import { CastType } from "@/types/types";
import MovieDetail from "../components/movie-detail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface MoviePageProps {
  movieData: IndividualMovie;
  castData: CastType[];
}

export default function MoviePage({movieData, castData}: MoviePageProps) {
  const router = useRouter();
  // const [movieData, setMovieData] = useState<IndividualMovie>();
  // const [castData, setCastData] = useState<CastType[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const pathname = usePathname();
  const movie = useMemo(() => {
    const segments = pathname.split("/");
    return segments[segments.length - 1];
  }, [pathname]);

  // const fetchMovieData = async () => {
  //   const movieEndpoint = `https://api.themoviedb.org/3/movie/${movie}`;
  //   const castEndpoint = `https://api.themoviedb.org/3/movie/${movie}/credits?language=en-US`;
  //   try {
  //     const [response1, response2] = await Promise.all([
  //       axios.get(movieEndpoint, {
  //         headers: {
  //           accept: "application/json",
  //           Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  //         },
  //       }),
  //       axios.get(castEndpoint, {
  //         headers: {
  //           accept: "application/json",
  //           Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  //         },
  //       }),
  //     ]);
  //     const movieData = response1.data;
  //     const castData = response2.data.cast;
  //     setLoading(false);
  //     return [movieData, castData];
  //   } catch (error) {
  //     console.log(error);
  //     return [null, null];
  //   }
  // };

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchData = async () => {
  //     try {
  //       const [fetchedMovie, fetchedCast] = await fetchMovieData();
  //       setMovieData(fetchedMovie);
  //       setCastData(fetchedCast);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleGoBack = () => {
    router.back()
  }

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
      <Button
        onClick={handleGoBack}
        className="absolute left-8 top-8 border border-gray-200 hover:bg-gray-200"
        variant="outline"
        size="icon"
      >
        <ArrowLeft />
      </Button>
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
        className={` h-dvh w-dvw py-4 flex flex-col items-center md:flex-row md:px-8 lg:px-16 ${
          !imageLoaded && "hidden"
        }`}
      >
        <div id="movie-poster" className="">
          <Image
            src={`https://image.tmdb.org/t/p/original/${movieData?.poster_path}`}
            alt=""
            height={400}
            width={349}
            className="shadow-2xl shadow-gray-400 md:h-[450px] md:w-[456px] md:hidden min-[1180px]:block lg:h-[600px] lg:w-[530px] rounded-2xl"
          />
        </div>
        {/* MovieDetails Component here */}
        {movieData && castData && (
          <MovieDetail movieData={movieData} castData={castData} />
        )}
      </div>
    </div>
  );
}
