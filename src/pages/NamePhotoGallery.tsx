import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Data, Video } from '../types/Movie';
import { fetchVideos, getMovieById, getNameById } from '../api/imdb';
import { Box, CircularProgress, Container } from '@mui/material';
import DataGrid from '../components/PhotoGallery/PhotoListGrid';

export default function NamePhotoGallery() {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading } = useQuery({
        queryKey: ["name-detail", id],
        queryFn: async (): Promise<Data> => {
            const [name] = await Promise.all([
                getNameById(id!),
                // fetchVideos(id!),
            ]);

            return {
                name,
            };
        },
        enabled: !!id,
        placeholderData: keepPreviousData,
    });

    if (isLoading || !data?.name) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Header type='name' name={data.name} page='Photos' />
            <DataGrid id={id!} type='name'/>
        </>
    )
}
