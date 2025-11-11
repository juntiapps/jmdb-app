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
import HeroBanner from "../components/MovieDetails/HeroBanner";

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
      <HeroBanner movie={movie} />
    </Container>
  );
}
