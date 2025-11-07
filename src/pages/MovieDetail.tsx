import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../api/imdb";
import { Movie } from "../types/Movie";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Chip,
} from "@mui/material";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (id) getMovieById(id).then(setMovie);
  }, [id]);

  if (!movie)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" gap={4} flexWrap="wrap">
        <img
          src={movie.primaryImage?.url ?? "https://placehold.co/300x450"}
          alt={movie.primaryTitle}
          style={{ width: "300px", borderRadius: "8px" }}
        />
        <Box flex={1}>
          <Typography variant="h4" gutterBottom>
            {movie.primaryTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {movie.plot}
          </Typography>
          {movie.rating && (
            <Typography variant="body2" sx={{ my: 1 }}>
              ⭐ {movie.rating.aggregateRating} ({movie.rating.voteCount} votes)
            </Typography>
          )}
          {movie.startYear && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              Release Year: {movie.startYear}
            </Typography>
          )}
          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            {movie.genres?.map((g) => (
              <Chip key={g} label={g} />
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
