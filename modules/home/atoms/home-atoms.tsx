import { atom } from "jotai";
import { TabSelectionType } from "@/types/types";

const loadingMovieListAtom = atom<boolean>(true);
const loadingTrendingAtom = atom<boolean>(true);
const loadingImageLoadAtom = atom<boolean>(true);

const selectedTabAtom = atom<TabSelectionType>("movie");

const currentMoviePageAtom = atom<number>(1);
const currentTVPageAtom = atom<number>(1);

export {
  loadingMovieListAtom,
  loadingTrendingAtom,
  loadingImageLoadAtom,
  currentMoviePageAtom,
  currentTVPageAtom,
  selectedTabAtom
};
