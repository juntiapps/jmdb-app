import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { Movie } from "../types/Movie";
import { searchMovies } from "../api/imdb";
import MovieList from "../components/MovieList";

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query) return;
        setLoading(true)
        searchMovies(query)
            .then((data) => setMovies(data))
            .finally(() => setLoading(false));
    }, [query]);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={600} mb={3}>
                Search results for: “{query}”
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                    <CircularProgress />
                </Box>
            ) : movies.length > 0 ? (
                <MovieList movies={movies} />
            ) : (
                <Typography color="text.secondary">No movies found.</Typography>
            )}
        </Box>
    );
}
