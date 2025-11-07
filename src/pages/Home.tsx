import { useState } from "react";
import { fetchMovies } from "../api/imdb";
import { Movie } from "../types/Movie";
import MovieList from "../components/MovieList";
import { Container, Typography, CircularProgress, Box, Button } from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [pageToken, setPageToken] = useState<string | null>(null);
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["movies", pageToken],
        queryFn: async () => {
            const data = await fetchMovies(pageToken || undefined);
            setMovies((prev) =>
                pageToken ? [...prev, ...(data.titles || [])] : data.titles || []
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

    if (isLoading && movies.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                🎬 Featured Movies
            </Typography>
            <MovieList movies={movies} />
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
        </Container>
    );
}
