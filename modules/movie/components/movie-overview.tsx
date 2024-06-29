import { IndividualMovie } from "@/types/movie-type";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Rocket, Dot } from "lucide-react";
import Link from "next/link";
import { minutesToHours, formatLargeNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MovieOverViewProps {
  movieData: IndividualMovie;
}

export default function MovieOverView({ movieData }: MovieOverViewProps) {
  return (
    <div className="flex">
      <div
        id="movie-overview"
        className="flex flex-col gap-4 w-full large:w-3/6"
      >
        {/* ------------------------------------ Genre ----------------------------------------- */}
        <div
          id="movie-genre"
          className="flex flex-wrap gap-2 lg:gap-6 justify-start sm:justify-cente md:justiry:start"
        >
          {movieData.genres.map((genre) => {
            return (
              <Badge
                key={`${genre.id}`}
                className="bg-gray-800 border border-gray-600 text-gray-400 h-4 md:h-6 lg:h-8 lg:w-36 flex justify-center"
              >
                {genre.name}
              </Badge>
            );
          })}
        </div>
        {/* ------------------------------------ Rating - Duration ----------------------------------------- */}
        <div id="rating-duration" className="flex gap-4 md:gap-6 lg:gap-8">
          <div
            id="rating"
            className="flex gap-2 justify-center items-center text-sm"
          >
            <div className="bg-yellow-300 h-4 w-12 md:h-6 md:w-6 rounded-full flex justify-center items-center">
              <Star
                stroke="black"
                height={12}
                width={12}
                className="text-yellow md:h-4 md:w-4"
              />
            </div>
            <span>{`${movieData.vote_average.toPrecision(2)}`}/10</span>
          </div>
          <div
            id="duration"
            className="flex gap-2 justify-center items-center text-sm"
          >
            <div className="bg-green-300 h-4 w-12 md:h-6 md:w-6 rounded-full flex justify-center items-center">
              <Clock
                stroke="black"
                height={12}
                width={12}
                className="text-yellow md:h-4 md:w-4"
              />
            </div>
            <span>{`${minutesToHours(movieData.runtime as number)}`}</span>
          </div>
          <div
            id="release-date"
            className="flex gap-2 justify-center items-center text-sm"
          >
            <div className="bg-red-300 h-4 w-12 md:h-6 md:w-6 rounded-full flex justify-center items-center">
              <Rocket
                stroke="black"
                height={12}
                width={12}
                className="text-yellow md:h-4 md:w-4"
              />
            </div>
            <span>{movieData.release_date}</span>
          </div>
        </div>
        {/* ------------------------------------ Movie Synopsis ----------------------------------------- */}
        <div id="movie-synopsis" className="pt-2 lg:pt-4 pr-12">
          <p className="text-xs md:text-sm text-gray-300">
            {movieData.overview}
          </p>
        </div>

        <div className="mb-4 flex gap-8 buttons pt-2 md:pt-4 lg:pt-8 lg:mb-0">
          <Button>TO WATCHLIST &nbsp; +</Button>
          <Link href={movieData.homepage}>
            <Button variant="outline" className="border-white">
              VISIT WEBSITE
            </Button>
          </Link>
        </div>
      </div>
      {/* ----------------------------------------- Credits------------------------------------------------------------------------------------------------------------- */}
      <div
        id="movie-credits"
        className="hidden w-3/6 min-[1400px]:block text-gray-300 pr-12"
      >
        <Separator className="mb-2 opacity-50" />
        <div id="finance" className="text-sm mb-8">
          <h1 className="text-blue-300 text-lg tracking-[8px] mb-2">Finance</h1>
          <p>Budget: {`${formatLargeNumber(movieData.budget as number)}`}</p>
          <p>Revenue: {`${formatLargeNumber(movieData.revenue as number)}`}</p>
        </div>
        <Separator className="my-2 opacity-50" />
        <div id="finance" className="text-sm mb-8">
          <h1 className="text-blue-300 text-lg tracking-[8px] mb-2">
            Production
          </h1>
          <div className="flex flex-wrap justify-start">
            {movieData.production_companies.map((company) => {
              return (
                <p key={`${company.id}`} className="flex">
                  {company.name}{" "}
                  <span>
                    <Dot />
                  </span>
                </p>
              );
            })}
          </div>
        </div>
        <Separator className="my-2 opacity-50" />
        <div id="finance" className="text-sm mb-8">
          <h1 className="text-blue-300 text-lg tracking-[8px] mb-2">
            Languages
          </h1>
          <div className="flex flex-wrap justify-start">
            {movieData.spoken_languages.map((company) => {
              return (
                <p key={`${company.iso_639_1}`} className="flex">
                  {company.name}
                  <span>
                    <Dot />
                  </span>
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
