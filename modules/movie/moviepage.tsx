"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IndividualMovie } from "../home/types/types";
import Loader from "@/components/ui/loader";

export default function MoviePage() {
  const [movieData, setMovieData] = useState<IndividualMovie>()
  const [loading, setLoading] = useState<boolean>(false)
  const pathname = usePathname();
  const movie = useMemo(() => {
    const segments = pathname.split("/");
    return segments[segments.length - 1];
  }, [pathname]);

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
      )
      const data = response.data
      setLoading(false)
      return data
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
        try {
            const data = await fetchMovieData()
            setMovieData(data)
        }
        catch (error) {
            console.log(error)
        }
    }
    fetchData()
  }, []);

  if (loading) {
    return <div className="h-dvh w-dvw flex justify-center items-center"><Loader size={80} color="white"/></div>
  }

  return <div>{movieData?.title} {movieData?.tagline}</div>;
}
