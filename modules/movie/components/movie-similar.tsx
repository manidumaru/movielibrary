import { useEffect, useState } from "react";
import { Movie } from "@/types/movie-type";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SimilarMovieProps {
  id: number;
}

export default function SimilarMovie({ id }: SimilarMovieProps) {
  const [similarMovieData, setSimilarMovieData] = useState<Movie[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSimilarMovies = async () => {
    try {
      var response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
          },
        }
      );
      const results = response.data;
      setLoading(false);
      return results.results;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const similarMovies = await fetchSimilarMovies();
        setSimilarMovieData(similarMovies);
      } catch (err) {}
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <ScrollArea className="h-32 md:h-[400px]">
      <div className="flex flex-wrap gap-4 justify-center items-center md:justify-start md:items-start">
        {similarMovieData?.slice(0, 15).map((movie) => {
          return (
            <div key={`${movie.id}`} className="figure-container">
              <div className="relative">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt="N/A"
                  height={148}
                  width={130}
                  className="object-cover"
                />
                <Link href={`/movie/${movie.id}`}>
                  <div className="p-2 flex flex-col justify-end gap-4 text-xs absolute top-0 left-0 h-full w-full bg-transparent figure-caption">
                    <p className="opacity-0 text-sm figure-caption-title">
                      {movie.title}
                    </p>
                    <p className="opacity-0 text-xs figure-caption-title flex gap-2">
                      <span>
                        <Star
                          stroke="yellow"
                          fill="yellow"
                          height={16}
                          width={16}
                        />
                      </span>
                      {`${movie.vote_average.toPrecision(2)}`}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
