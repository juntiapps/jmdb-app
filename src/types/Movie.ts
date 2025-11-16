import { NumberLiteralType } from "typescript";

export interface MovieImage {
  url: string;
  width: number;
  height: number;
  type: string;
}

export interface MovieRating {
  aggregateRating: number;
  voteCount: number;
}

export interface MovieDirector {
  id: string;
  displayName: string;
}

export interface MovieWriter {
  id: string;
  displayName: string;
}

export interface MovieStar {
  id: string;
  displayName: string;
}

export interface Movie {
  id: string;
  type: string;
  isAdult: boolean;
  primaryTitle: string;
  originalTitle: string;
  primaryImage?: MovieImage;
  startYear?: number;
  endYear?: number;
  runtimeSeconds?: number;
  genres?: string[];
  rating?: MovieRating;
  plot?: string;
  directors?: MovieDirector[];
  writers?: MovieWriter[];
  stars?: MovieStar[];
}
interface PrimaryImage {
  url: string;
  width: number;
  height: number;
}

export interface Video {
  id: string;
  type: string;
  name: string;
  primaryImage: PrimaryImage;
  description: string;
  width: number;
  height: number;
  runtimeSeconds: number;
}

export interface Images {
  url: string;
  type: string;
  width: number;
  height: number;
}

export interface Data {
  movie: Movie | null;
  videos: Video[];
  images: Images[];
  countVid: number;
  countImg: string;
  realCountImg: number;
  topCast: TopCastData;
}

export interface TopCast {
  id: string;
  displayName: string;
  characters?: string[];
  primaryImage: PrimaryImage;
}

export interface Credits {
  name: Name;
  category: string;
  characters: string[];
}

export interface Name {
  id: string;
  displayName: string;
  alternativeNames: string[];
  primaryImage: PrimaryImage;
  primaryProfessions: string;
}

export interface TopCastData {
    data: TopCast[]
    totalCount: number
}