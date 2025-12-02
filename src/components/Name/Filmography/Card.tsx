import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    useTheme,
    Grid,
    useMediaQuery,
    IconButton,
    Box,
    Dialog,
    Button,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { FilmoCredit, Movie } from "../../../types/Movie";
import { Close, InfoOutline } from "@mui/icons-material";
import { duration } from "../../../helpers/Converter";
import { useState } from "react";
import { getMovieById } from "../../../api/imdb";

interface FilmoCardProps {
    filmo: FilmoCredit;
    name?: string
}

export default function MovieCard({ filmo, name }: FilmoCardProps) {
    const [open, setOpen] = useState(false)
    const [mov, setMov] = useState<Movie | null>(null)

    const navigate = useNavigate()
    const theme = useTheme();
    const movie = filmo.title;
    const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

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

    const handleInfoClick = async () => {
        const mo = await getMovieById(movie.id)
        setMov(mo)
        setOpen(true)
    }

    const handleClick = async () => {
        navigate(`/movie/${movie.id}`)
    }

    return (
        <>
            <Card
                variant="outlined"
                // component={RouterLink}
                // to={`/movie/${movie.id}`}
                sx={{
                    border: 'none',
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
                <Grid container spacing={1} alignItems={'center'} sx={{
                    // borderBottom: `1px solid ${theme.palette.text.secondary}`,
                    padding: 1
                }}>
                    <Grid size={'grow'}>
                        <CardActionArea
                            onClick={() => handleClick()}
                            onMouseEnter={handleMouseEnter}
                            >
                            <Grid container spacing={1} alignItems={'center'} sx={{  }}>
                                <Grid size='auto'>
                                    <CardMedia
                                        component="img"
                                        height={isSmDown ? '77' : '60'}
                                        //width='52'
                                        image={img}
                                        alt={movie.primaryTitle}
                                        sx={{
                                            objectFit: "cover",
                                            borderRadius: 2,
                                            // borderBottom: `2px solid ${theme.palette.primary.main}`,
                                        }}
                                    />
                                </Grid>
                                <Grid size='grow'>
                                    <Grid container alignItems={'center'}>
                                        <Grid size={{ xs: 12, sm: 'grow' }}>
                                            <Typography variant={'body1'} noWrap fontWeight={600}>
                                                {movie.primaryTitle}
                                            </Typography>
                                            {rating !== undefined && (
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}
                                                >
                                                    <Typography component={'span'} color={theme.palette.primary.main}> ⭐ </Typography>{rating.toFixed(1)}
                                                </Typography>
                                            )}
                                            <Typography
                                                variant="body2"
                                                sx={{ color: theme.palette.text.secondary }}
                                            >
                                                {filmo.category}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 'auto' }}>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: theme.palette.text.secondary }}
                                            >
                                                {movie.startYear}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardActionArea>
                    </Grid>
                    <Grid size='auto'>
                        <IconButton aria-label="more options" size="small" sx={{ color: theme.palette.info.main }}
                            onClick={handleInfoClick}>
                            <InfoOutline />
                        </IconButton>
                    </Grid>
                </Grid>

            </Card>
            {mov && (
                <PopupInfo movie={mov!} name={name!} category={filmo.category} open={open} setOpen={setOpen} />

            )}
        </>
    );
}

function PopupInfo({ movie, name, category, open, setOpen }: { movie: Movie, name: string, category: string, open: boolean, setOpen: (open: boolean) => void }) {
    const theme = useTheme();
    return (
        <Dialog open={open} onClose={() => setOpen(false)} >
            <Button onClick={() => setOpen(false)} sx={{
                position: 'absolute',
                top: '10px',
                right: '0px',
                color: theme.palette.primary.main
            }}><Close /></Button>
            <Grid container spacing={1} padding={2}>
                <Grid size='auto'>
                    <CardMedia
                        component="img"
                        height={107}
                        image={movie.primaryImage?.url ?? "https://placehold.co/500x750"}
                        alt={movie.primaryTitle}
                        sx={{
                            objectFit: "cover",
                            borderRadius: 2,
                            // borderBottom: `2px solid ${theme.palette.primary.main}`,
                        }}
                    />
                </Grid>
                <Grid size='grow'>
                    <Typography variant={'body1'} noWrap fontWeight={600}>
                        {movie.primaryTitle}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                    >
                        {`${movie?.startYear} — ${duration(movie?.runtimeSeconds ?? 0)}`}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                    >
                        {movie.genres?.join(", ")}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: theme.palette.primary.main, fontWeight: 500 }}
                    >
                        ⭐ {movie.rating?.aggregateRating.toFixed(1)}/10
                    </Typography>
                </Grid>
            </Grid>
            <Box padding={2}>
                <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', mt: 1 }}
                >
                    {movie.plot}
                </Typography>
                <Typography fontWeight={'bold'} sx={{
                    mt: 2,
                    color: theme.palette.text.primary
                }}>
                    {name}'s credits:
                </Typography>
                <Typography
                    sx={{ color: 'text.secondary', mt: 1, fontWeight: 'bold', textTransform: 'capitalize' }}
                >
                    {category.replaceAll('_', " ")}
                </Typography>
            </Box>

        </Dialog>
    )
}
