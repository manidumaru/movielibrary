"use client";

import MovieListSection from "../components/movieList";
import TrendindSection from "../components/trending";
import TvList from "../components/tvlist";
import { useAtomValue, useSetAtom } from "jotai";
import {
  loadingMovieListAtom,
  loadingTrendingAtom,
  loadingImageLoadAtom,
  selectedTabAtom
} from "../atoms/home-atoms";
import Loader from "@/components/ui/loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HomePage() {
  const selectedTab = useAtomValue(selectedTabAtom)
  const setSelectedTab = useSetAtom(selectedTabAtom)
  const loadingMovieList = useAtomValue(loadingMovieListAtom);
  const loadingTrending = useAtomValue(loadingTrendingAtom);
  const loadingImage = useAtomValue(loadingImageLoadAtom);

  return (
    <section className="mb-6">
      {loadingMovieList ||
        loadingTrending ||
        (loadingImage && (
          <div className="h-dvh w-[90%] flex flex-col gap-4 justify-center items-center">
            <Loader size={80} color="white" />
          </div>
        ))}
      <div className="mb-6">
        <TrendindSection />
        <Tabs defaultValue={selectedTab} className="w-full flex flex-col justify-center items-center pt-4">
          <TabsList className="w-[350px]">
            <TabsTrigger className="w-[175px]" value="movie">Movies</TabsTrigger>
            <TabsTrigger className="w-[175px]" value="tv">TV Shows</TabsTrigger>
          </TabsList>
          <TabsContent value="movie" onClick={() => {setSelectedTab("movie")}}>
            <MovieListSection />
          </TabsContent>
          <TabsContent value="tv" onClick={() => {setSelectedTab("tv")}}>
            <TvList />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
