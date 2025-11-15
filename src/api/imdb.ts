import axios from "axios";
import { Movie, Video, Images, Credits, TopCast, TopCastData } from "../types/Movie";

const BASE_URL = "https://api.imdbapi.dev";

interface ApiGetMovieResponse {
    titles: Movie[];
    totalCount: number;
    nextPageToken?: string;
}

interface ApiGetVideoResponse {
    videos: Video[];
    totalCount: number;
}

interface ApiGetImagesResponse {
    images: Images[];
    totalCount: number;
}

interface ApiGetCreditsResponse {
    credits: Credits[];
    totalCount: number;
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

export const fetchVideos = async (id: string): Promise<ApiGetVideoResponse> => {
    const res = await axios.get<ApiGetVideoResponse>(`${BASE_URL}/titles/${id}/videos`)
    return res.data
}

export const fetchImages = async (id: string): Promise<ApiGetImagesResponse> => {
    const res = await axios.get<ApiGetImagesResponse>(`${BASE_URL}/titles/${id}/images`)
    return res.data
}

export const fetchTopCast = async (id: string): Promise<TopCastData> => {
    const res = await axios.get<ApiGetCreditsResponse>(`${BASE_URL}/titles/${id}/credits`)

    const data = res.data.credits
        .filter(item => ['actor', 'actress'].includes(item.category))
        .map(item => ({
            id: item.name.id,
            displayName: item.name.displayName,
            characters: item.characters,
            primaryImage: item.name.primaryImage
        }))

    const count = res.data.totalCount
    return {
        data: data, totalCount: count
    }
}

