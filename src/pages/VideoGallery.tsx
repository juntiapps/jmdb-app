import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Data, Video } from '../types/Movie';
import { fetchVideos, getMovieById } from '../api/imdb';
import { Box, CircularProgress, Container } from '@mui/material';
import DataGrid from '../components/VideoGallery/VideoListGrid';
import Pagination from '../components/Filter';

export default function VideoGallery() {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading } = useQuery({
        queryKey: ["movie-detail", id],
        queryFn: async (): Promise<Data> => {
            const [movie] = await Promise.all([
                getMovieById(id!),
                // fetchVideos(id!),
            ]);

            return {
                movie,
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
        <>
            <Header movie={data.movie} page='Video' />
            <DataGrid id={id!}/>
        </>
    )
}
