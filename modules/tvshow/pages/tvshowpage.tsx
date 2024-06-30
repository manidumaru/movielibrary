"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { TVShowDetail } from "@/types/tv-type";
import Image from "next/image";
import Loader from "@/components/ui/loader";

interface TVShowPageProps {
  TVDetail: TVShowDetail;
}

export default function TVSowPage({ TVDetail }: TVShowPageProps) {
  // const [TVDetail, setTVDetail] = useState<TVShowDetail>();
  const pathname = usePathname();
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);
  const tvShowId = useMemo(() => {
    const segments = pathname.split("/");
    return segments[segments.length - 1];
  }, [pathname]);

  // const fetchTVShow = async () => {
  //   try {
  //     var response = await axios.get(
  //       `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`,
  //       {
  //         headers: {
  //           accept: "application/json",
  //           Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  //         },
  //       }
  //     );

  //     const data = response.data;
  //     setIsLoadingData(false);
  //     console.log(data);
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoadingData(true);
  //       const fetchedData = await fetchTVShow();
  //       if (!fetchedData) {
  //         throw "no results";
  //       }
  //       setTVDetail(fetchedData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="h-dvh w-dvw relative">
      {(isLoadingData || isLoadingImage) && (
        <div className="absolute h-dvh w-dvw flex flex-col gap-2 justify-center items-center">
          <Loader size={80} color="white" />
          <p>Fetching...</p>
        </div>
      )}
      <Image
        src={`https://image.tmdb.org/t/p/original${TVDetail?.backdrop_path}`}
        alt=""
        fill={true}
        onLoad={() => {
          setIsLoadingImage(false);
        }}
        className="object-cover opacity-20"
      />
      <p>{TVDetail.name}</p>
    </div>
  );
}
