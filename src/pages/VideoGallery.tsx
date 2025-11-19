import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Data } from '../types/Movie';
import { fetchVideos, getMovieById } from '../api/imdb';
import { Box, CircularProgress, Container } from '@mui/material';

export default function VideoGallery() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate()

    const { data, isLoading } = useQuery({
        queryKey: ["movie-detail", id],
        queryFn: async (): Promise<Data> => {
            const [movie, videoData] = await Promise.all([
                getMovieById(id!),
                fetchVideos(id!),
            ]);

            return {
                movie,
                videos: videoData.videos || [],
                countVid: videoData.totalCount || 0,
            };
        },
        enabled: !!id,
        placeholderData: keepPreviousData,
    });

    if (isLoading || !data?.movie) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Header movie={data.movie} />
    )
}
