import { IndividualMovie } from "@/types/movie-type";
import { CastType } from "@/types/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MovieOverView from "./movie-overview";
import MovieCast from "./movie-cast";

interface MovieDetailProps {
  movieData: IndividualMovie;
  castData: CastType[];
}

export default function MovieDetail({ movieData, castData }: MovieDetailProps) {
  return (
    <div
      id="movie-detail"
      className="md:min-h-[600px] pt-0 md:pt-0 pl-6 lg:pl-12 flex flex-col gap-2 w-full items-start sm:items-center"
    >
      <div
        id="movie-title"
        className="flex flex-col w-full sm:items-center md:items-start"
      >
        <p className="font-extrabold text-[24px] md:text-[30px] lg:text-[48px] min-[1500px]:text-[56px]">
          {movieData.title}
        </p>
        <span>{movieData.tagline}</span>
      </div>
      <div
        id="movie-info"
        className="w-full flex flex-col md:pt-4 lg:pt-6 lg:flex-row items-start sm:items-center md:items-start"
      >
        {/* need to flex-row at lg */}
        <Tabs defaultValue="overview">
          <TabsList className="mb-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cast">Cast</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-2">
            <MovieOverView movieData={movieData} />
          </TabsContent>
          <TabsContent className="mt-2" value="cast">
            <MovieCast castData={castData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
