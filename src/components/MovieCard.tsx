import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Movie } from "../types/Movie";
import { useQueryClient } from "@tanstack/react-query";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const theme = useTheme();

    const img =
        movie.primaryImage?.url ?? "https://placehold.co/500x750";

    const rating = movie.rating?.aggregateRating;
    const votes = movie.rating?.voteCount;

    const queryClient = useQueryClient();

    const handleMouseEnter = () => {
        queryClient.prefetchQuery({
            queryKey: ["movie", movie.id],
            queryFn: () => fetch(`https://api.imdbapi.dev/titles/${movie.id}`).then((r) => r.json()),
        });
    };

    return (
        <Card
            component={RouterLink}
            to={`/movie/${movie.id}`}
            sx={{
                textDecoration: "none",
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: 2,
                boxShadow: theme.shadows[2],
                "&:hover": {
                    boxShadow: theme.shadows[8],
                    transform: "translateY(-4px)",
                    transition: "all 0.2s ease-in-out",
                },
            }}
        >
            <CardActionArea onMouseEnter={handleMouseEnter}>
                <CardMedia
                    component="img"
                    height="350"
                    image={img}
                    alt={movie.primaryTitle}
                    sx={{
                        objectFit: "cover",
                        borderBottom: `3px solid ${theme.palette.primary.main}`,
                    }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" noWrap fontWeight={600}>
                        {movie.primaryTitle}
                    </Typography>

                    {rating !== undefined && (
                        <Typography
                            variant="body2"
                            sx={{ color: theme.palette.primary.main, fontWeight: 500 }}
                        >
                            ⭐ {rating.toFixed(1)} {votes ? `(${votes})` : ""}
                        </Typography>
                    )}

                    {movie.genres && movie.genres.length > 0 && (
                        <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.secondary }}
                        >
                            {movie.genres.join(", ")}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
