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
}
