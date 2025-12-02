import React, { useState } from 'react'
import SectionTitle from '../../SectionTitle'
import DataTable from '../../DataTable'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getFilmographyByNameId } from '../../../api/imdb';
import { FilmoCredit, Movie } from '../../../types/Movie';
import { Box, Button, CircularProgress } from '@mui/material';
import FilmoList from './List';

export default function Section({ id,name }: { id: string,name?:string }) {
    const [filmo, setFilmo] = useState<FilmoCredit[]>([]);
    const [pageToken, setPageToken] = useState<string | null>(null);
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["filmo", id ,pageToken],
        queryFn: async () => {
            const data = await getFilmographyByNameId(pageToken || undefined, id);
            setFilmo((prev) =>
                pageToken ? [...prev, ...(data.credits || [])] : data.credits || []
            );
            return data;
        },
        placeholderData: keepPreviousData, // biar gak flicker saat pagination
    });

    const nextPageToken = data?.nextPageToken ?? null;

    const loadMore = () => {
        if (nextPageToken) {
            setPageToken(nextPageToken);
        }
    };

    if (isLoading && filmo.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <SectionTitle title="Credits" action={false} />
            {/* <DataTable data={data} /> */}
            <FilmoList filmo={filmo} name={name}/>
            {data?.nextPageToken && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={loadMore}
                        disabled={isFetching}
                    >
                        {isFetching ? "Loading..." : "Load More"}
                    </Button>
                </Box>
            )}
        </>
    )
}
