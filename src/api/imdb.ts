import axios from "axios";
import { Movie } from "../types/Movie";

const BASE_URL = "https://api.imdbapi.dev";

interface ApiGetMovieResponse {
    titles: Movie[];
    totalCount: number;
    nextPageToken?: string;
}

/**
 * Fetch list of movies (supports pagination)
 * @param nextPageToken optional, for loading next pages
 */
export const fetchMovies = async (nextPageToken?: string): Promise<ApiGetMovieResponse> => {
    const url = nextPageToken
    ? `https://api.imdbapi.dev/titles?types=MOVIE&pageToken=${nextPageToken}`
    : `https://api.imdbapi.dev/titles?types=MOVIE`;

    const res = await axios.get<ApiGetMovieResponse>(url)

    return res.data
};

export const getMovieById = async (id: string): Promise<Movie> => {
    const res = await axios.get<Movie>(`${BASE_URL}/titles/${id}`);
    return res.data;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
    const res = await axios.get<ApiGetMovieResponse>(`${BASE_URL}/search/titles?query=${query}`);
    return res.data.titles;
};
