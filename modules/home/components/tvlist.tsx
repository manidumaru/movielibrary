import axios from "axios";
import { useState, useEffect } from "react";
import { TVShow } from "@/types/tv-type";
import Image from "next/image";
import Link from "next/link";

import { StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { useAtom, useSetAtom } from "jotai";

import { loadingImageLoadAtom, currentTVPageAtom } from "../atoms/home-atoms";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TvList() {
  const [tvData, setTvData] = useState<TVShow[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useAtom(currentTVPageAtom);
  const setImageLoading = useSetAtom(loadingImageLoadAtom);
  const pages = [1, 2, 3, 4, 5, 6, 7];

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

  const fetchTVShows = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${currentPage}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
          },
        }
      );
      var data = response.data;
      setLoading(false);
      return data.results;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const fetchedData = await fetchTVShows();
        setTvData(fetchedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage, setCurrentPage]);

  return (
    <>
      <div className="flex flex-wrap justify-center space-y-10">
        {tvData?.map((show) => {
          return (
            <Link
              className="mt-10 mx-2"
              href={`/tvshow/${show.id}`}
              key={`${show.id}`}
            >
              <Card className="w-[150px] sm:w-[180px] md:w-[220px] lg:w-[256px]">
                <CardContent className="relative w-full h-[171px] sm:h-[205px] md:h-[250px] lg:h-[320px] mb-4">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
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
                    {show.name}
                  </p>
                </CardTitle>
                <CardHeader className="flex flex-row justify-start items-center gap-2">
                  <StarIcon
                    height={16}
                    width={16}
                    fill="yellow"
                    stroke="yellow"
                  />
                  <p>{`${show.vote_average.toPrecision(2)}`}</p>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <p className="text-xs sm:text-sm">{show.first_air_date} </p>
                  <Badge
                    variant={"default"}
                    className="hidden md:block opacity-60"
                  >
                    TV Show
                  </Badge>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
      <div className="mt-4">
        <PaginationSection />
      </div>
    </>
  );
}
