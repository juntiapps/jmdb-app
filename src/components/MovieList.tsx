import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";
import { Movie } from "../types/Movie";

interface MovieListProps {
    movies: Movie[];
}

export default function MovieList({ movies }: MovieListProps) {
    return (
        <Grid container spacing={2}>
            {movies.map((movie) => (
                <Grid key={movie.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                    <MovieCard movie={movie} />
                </Grid>
            ))}
        </Grid>
    );
}
