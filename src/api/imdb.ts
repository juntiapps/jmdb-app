import axios from "axios";
import { Movie, Video, Images, Credits, TopCast, TopCastData, AwardNomination, AwardNominationStats, AwardNominationData, Interest, MovieInterest, BoxOffice, Categories, Name, FilmoCredit, Relationship, Trivia } from "../types/Movie";

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

interface ApiGetInterestsResponse {
    categories: Categories[]
}

interface InterestPageResponse {
    topRated: Movie[];
    popular: Movie[];
    count: number;
}

interface FilmographyResponse {
    credits: FilmoCredit[];
    totalCount: number;
    nextPageToken?: string;
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

    let typeQuery = types !== undefined ? `types=${types}` : "";

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

    let typeQuery = types !== undefined ? `types=${types}` : "";

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

export const fetchInterests = async (): Promise<Categories[]> => {
    const res = await axios.get<ApiGetInterestsResponse>(`${BASE_URL}/interests`)

    return res.data.categories
}

export const getInterestById = async (id: string): Promise<Interest> => {
    const res = await axios.get<Interest>(`${BASE_URL}/interests/${id}`)

    return res.data
}

export const fetchMovieByInterest = async (interestId: string): Promise<InterestPageResponse> => {
    const params = `types=MOVIE&interestIds=${interestId}`;

    const [res, res2] = await Promise.all([
        axios.get<ApiGetMovieResponse>(`${BASE_URL}/titles?${params}&sortBy=SORT_BY_POPULARITY&sortOrder=ASC`),
        axios.get<ApiGetMovieResponse>(`${BASE_URL}/titles?${params}&sortBy=SORT_BY_USER_RATING_COUNT&sortOrder=DESC`)
    ]);

    return {
        popular: res.data.titles,
        topRated: res2.data.titles,
        count: res.data.totalCount
    };
};


export const fetchBoxOffice = async (id: string): Promise<BoxOffice> => {
    const res = await axios.get<BoxOffice>(`${BASE_URL}/titles/${id}/boxOffice`)

    return res.data
}

export const getNameById = async (id: string): Promise<Name> => {
    const res = await axios.get<Name>(`${BASE_URL}/names/${id}`);
    return res.data;
};

export const fetchNameImages = async (id: string, types?: string, nextPageToken?: string): Promise<ApiGetImagesResponse> => {

    let typeQuery = types !== undefined ? `types=${types}` : "";

    const url = nextPageToken
        ? `${BASE_URL}/names/${id}/images?${typeQuery}&pageToken=${nextPageToken}`
        : `${BASE_URL}/names/${id}/images?${typeQuery}`;

    // Hapus & jika parameter kosong
    const cleanUrl = url.replace(/\?&/, "?").replace(/&$/, "");

    // console.log("URL:", cleanUrl,'query',typeQuery);

    const res = await axios.get<ApiGetImagesResponse>(cleanUrl);

    return res.data
}

export const getFilmographyByNameId = async (nextPageToken?: string, id?: string): Promise<FilmographyResponse> => {
    const url = nextPageToken
        ? `https://api.imdbapi.dev/names/${id}/filmography?pageToken=${nextPageToken}`
        : `https://api.imdbapi.dev/names/${id}/filmography`;

    const res = await axios.get<FilmographyResponse>(url)

    return res.data
};

export const fetchRelationships = async (id: string): Promise<Relationship> => {
    const res = await axios.get<Relationship>(`${BASE_URL}/names/${id}/relationships`);
    return res.data;
};

export const fetchTrivia = async (nextPageToken?: string, id?: string, length?: number): Promise<Trivia> => {
    let l = '?'
    if(length){
        l = `?pageSize=${length}`
    }

    const url = nextPageToken
        ? `https://api.imdbapi.dev/names/${id}/trivia${l}pageToken=${nextPageToken}`
        : `https://api.imdbapi.dev/names/${id}/trivia${l}`;

    const res = await axios.get<Trivia>(url)

    return res.data
};