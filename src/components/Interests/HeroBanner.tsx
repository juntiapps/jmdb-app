import React, { useEffect, useState } from 'react'
import { Interest, Movie } from '../../types/Movie'
import { Box, Chip, CircularProgress, Container, Grid, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from '@mui/icons-material';
import { fetchMovieByInterest } from '../../api/imdb';
import { numberWithCommas } from '../../helpers/Converter';
import Popular from './Popular';
import TopRated from './TopRated';
import SimilarInterest from './SimilarInterest';

export default function HeroBanner({ interest }: { interest: Interest }) {
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [numberMovieByInterest, setNumberMovieByInterest] = useState<number>(0);

    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const navigate = useNavigate();

    useEffect(() => {
        interest && getData(interest.id)
    }, [])

    const getData = async (id: string) => {
        setLoading(true);
        const data = await fetchMovieByInterest(id!)
        if (data) {
            setTopRated(data.topRated)
            setPopular(data.popular)
            setNumberMovieByInterest(data.count)
        }
        setLoading(false);
    }

    return (
        // <Container>
        loading ? (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        ) : (<>
            <Grid container spacing={0} sx={{
                // mt: 4,
                pt: 4,
                mb: 4,
                display: "flex",
                alignItems: "stretch", // KUNCI!
                maxWidth: '1024px',
                mx: 'auto',
                backgroundColor: isDark ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'
            }}>
                {/** picture */}
                <Grid size={{ sm: 6, xs: 12 }} sx={{ position: 'relative', display: "flex", }}>
                    <img src={interest.primaryImage.url} alt={interest.name} style={{ width: '100%', height: '100%', borderRadius: 8, objectFit: 'cover', objectPosition: 'center', }} />
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            left: '70%',
                            borderRadius: 2, // ikut rounded gambar
                            background: isDark
                                ? "linear-gradient(to right, transparent 30%, rgba(0,0,0,0.8))"
                                : "linear-gradient(to right, transparent 30%, rgba(255,255,255,0.8))",
                        }}
                    />
                </Grid>
                {/** detail */}

                <Grid size={{ sm: 6, xs: 12 }} sx={{ p: 1, backgroundColor: isDark ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)', }}>
                    <Box
                        onClick={() => navigate('/interest')}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            cursor: 'pointer',
                            // color: 'white',
                            fontWeight: 'bold',
                            userSelect: 'none',
                            mb: 3,
                            ml: -1
                        }}
                    >
                        <ChevronLeft />
                        <Typography>All Interests</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 28, mb: 2, color: isDark ? 'primary.main' : undefined }}>{interest.name}</Typography>
                    <Typography sx={{ mb: 2, color: isDark ? '#FFFFFFB3' : 'grey' }}>{interest.isSubGenre ? 'Subgenre' : 'Genre'} </Typography>
                    <Typography sx={{ mb: 2 }}>{interest.description}</Typography>
                    <Chip
                        label={
                            <Typography sx={{ fontWeight: 'bold' }}>Movies · <Typography component="span">{numberWithCommas(numberMovieByInterest)}</Typography></Typography>
                        }
                        onClick={() => { }}
                        color={"default"}
                        sx={{ textTransform: 'capitalize', cursor: 'pointer' }}
                    />
                </Grid>
            </Grid>
            <Container sx={{
                backgroundColor: isDark ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'
            }}>
                <Popular data={popular} interestName={interest.name} />
                <TopRated data={topRated} interestName={interest.name} />
                <SimilarInterest interest={interest.similarInterests!} />
            </Container>
        </>)
        // </Container>
    )
}
