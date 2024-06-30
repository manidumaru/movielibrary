import TVSowPage from "../../../../modules/tvshow/pages/tvshowpage";
import axios from "axios";
import { TVShowDetail } from "@/types/tv-type";

export type TVShowProps = {
  params: {
    tvshow: string;
  };
};

export default async function TVShow({ params }: TVShowProps) {
  const tvResponse = await axios.get(
    `https://api.themoviedb.org/3/tv/${params.tvshow}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    }
  );

  const tvResults = tvResponse.data
  return <TVSowPage TVDetail={tvResults} />;
}

export async function generateStaticParams() {
  const movies = await axios.get(
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    }
  );
  const response = await movies.data.results;

  return response.map((tv: TVShowDetail) => ({
    id: tv.id.toString(),
  }));
}
