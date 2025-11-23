import axios from "axios";
import { Movie, Video, Images, Credits, TopCast, TopCastData, AwardNomination, AwardNominationStats, AwardNominationData, Interest, MovieInterest, BoxOffice } from "../types/Movie";

const BASE_URL = "https://api.imdbapi.dev";

interface ApiGetMovieResponse {
    titles: Movie[];
    totalCount: number;
    nextPageToken?: string;
}

interface ApiGetVideoResponse {
    videos: Video[];
    totalCount: number;
    nextPageToken?: string;
}

interface ApiGetImagesResponse {
    images: Images[];
    totalCount: number;
    nextPageToken?: string;
}

interface ApiGetCreditsResponse {
    credits: Credits[];
    totalCount: number;
}

/**
 * Fetch list of movies (supports pagination)
 * @param nextPageToken optional, for loading next pages
 */
export const fetchMovies = async (nextPageToken?: string, genres?: string): Promise<ApiGetMovieResponse> => {
    let genre = ''
    if (genre) {
        genre = `&genres=${genres}`
    }
    const url = nextPageToken
        ? `https://api.imdbapi.dev/titles?types=MOVIE&pageToken=${nextPageToken}${genre}`
        : `https://api.imdbapi.dev/titles?types=MOVIE${genre}`;

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

// export const fetchVideos = async (id: string): Promise<ApiGetVideoResponse> => {
//     const res = await axios.get<ApiGetVideoResponse>(`${BASE_URL}/titles/${id}/videos`)
//     return res.data
// }

// export const fetchVideos = async (id: string, types?: string, nextPageToken?: string): Promise<ApiGetVideoResponse> => {
//     let typeQuery = types!=='all' ? `types=${types}` : "";

//     const url = nextPageToken
//         ? `${BASE_URL}/titles/${id}/videos?${typeQuery}&pageToken=${nextPageToken}`
//         : `${BASE_URL}/titles/${id}/videos?${typeQuery}`;

//     // Hapus & jika parameter kosong
//     const cleanUrl = url.replace(/\?&/, "?").replace(/&$/, "");

//     console.log("URL:", cleanUrl,'query',typeQuery);

//     const res = await axios.get<ApiGetVideoResponse>(cleanUrl);

//     return res.data
// }
export const fetchVideos = async (id: string, types?: string, nextPageToken?: string): Promise<ApiGetVideoResponse> => {
  
    let typeQuery = types!==undefined ? `types=${types}` : "";

    const url = nextPageToken
        ? `${BASE_URL}/titles/${id}/videos?${typeQuery}&pageToken=${nextPageToken}`
        : `${BASE_URL}/titles/${id}/videos?${typeQuery}`;

    // Hapus & jika parameter kosong
    const cleanUrl = url.replace(/\?&/, "?").replace(/&$/, "");

    // console.log("URL:", cleanUrl,'query',typeQuery);

    const res = await axios.get<ApiGetVideoResponse>(cleanUrl);

    return res.data
}

export const fetchImages = async (id: string, types?: string, nextPageToken?: string): Promise<ApiGetImagesResponse> => {
    
    let typeQuery = types!==undefined ? `types=${types}` : "";

    const url = nextPageToken
        ? `${BASE_URL}/titles/${id}/images?${typeQuery}&pageToken=${nextPageToken}`
        : `${BASE_URL}/titles/${id}/images?${typeQuery}`;

    // Hapus & jika parameter kosong
    const cleanUrl = url.replace(/\?&/, "?").replace(/&$/, "");

    // console.log("URL:", cleanUrl,'query',typeQuery);

    const res = await axios.get<ApiGetImagesResponse>(cleanUrl);

    return res.data
}

// export const fetchImages = async (id: string): Promise<ApiGetImagesResponse> => {
//     const res = await axios.get<ApiGetImagesResponse>(`${BASE_URL}/titles/${id}/images`)
//     return res.data
// }

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

export const fetchAwardNomination = async (id: string): Promise<AwardNomination> => {
    const res = await axios.get<AwardNomination>(`${BASE_URL}/titles/${id}/awardNominations`)

    return res.data
}

export const fetchInterests = async (interests: MovieInterest[]): Promise<Interest[]> => {
    if (!interests || interests.length === 0) return [];

    const data = await Promise.all(
        interests.map(async (element) => {
            const res = await axios.get<Interest>(`${BASE_URL}/interests/${element.id}`);
            return res.data;
        })
    );

    return data;
}


export const fetchBoxOffice = async (id: string): Promise<BoxOffice> => {
    const res = await axios.get<BoxOffice>(`${BASE_URL}/titles/${id}/boxOffice`)

    return res.data
}