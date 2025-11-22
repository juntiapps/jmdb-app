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

export interface Genre {
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
  interests?: MovieInterest[];
  originCountries?: MovieOrigin[];
  spokenLanguages?: Languages[];
}

export interface Languages {
  code: string;
  name: string;
}

export interface MovieOrigin {
  code: string;
  name: string;
}

export interface MovieInterest {
  id: string;
  name: string;
}

export interface Interest {
  id: string;
  name: string;
  primaryImage: PrimaryImage;
  description: string;
  similarInterests: Interest[];
  isSubGenre?: boolean
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
  videos?: Video[];
  images?: Images[];
  countVid?: number;
  countImg?: string;
  realCountImg?: number;
  topCast?: TopCastData;
  awardNominationStats?: AwardNominationStats;
  interests?: Interest[];
  boxOffice?: BoxOffice;
}

export interface AwardNomination {
  stats: AwardNominationStats;
  awardNomination: AwardNominationData[];
}

export interface AwardNominationStats {
  nominationCount: number;
  winCount: number;
}

export interface AwardNominationData {
  nominees: Name;
  event: Event;
  year: number;
  text: string;
  category: string;
  isWinner: boolean;
  winnerRank: number;
}

export interface Event {
  id: string;
  name: string;
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

export interface BoxOffice {
  worldwideGross: {
    amount: string,
    currency: string
  },
  productionBudget: {
    amount: string,
    currency: string
  }
}

export interface PageInfoTypes {
  from: number;
  to: number;
  total: number
}

export interface FilterTypes {

}

export interface SortTypes {
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
}