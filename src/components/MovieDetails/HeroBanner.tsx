import { Box, Chip, Grid, Icon, Link, List, ListItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Images, Movie, Video } from '../../types/Movie';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchImages, fetchVideos } from '../../api/imdb';
import { ChevronRight, PhotoLibrary, VideoLibrary } from '@mui/icons-material';

export default function HeroBanner({ movie }: { movie: Movie }) {
    const [videos, setVideos] = useState<Video[]>([])
    const [countVid, setCountVid] = useState<number>(0)
    const [images, setImages] = useState<Images[]>([])
    const [countImg, setCountImg] = useState<number>(0)

    const duration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const hrs = Math.floor(mins / 60);
        const remMins = mins % 60;
        return hrs > 0 ? `${hrs}h ${remMins}m` : `${remMins}m`;
    };

    const duration2 = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const secsStr = secs.toString().padStart(2, '0');
        return `${mins}:${secsStr}`;
    };

    const voteCount = (count: number) => {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(0)}M`;
        }
        if (count >= 1000) {
            return `${(count / 1000).toFixed(0)}K`;
        }
        return count.toString();
    }

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["videos"],
        queryFn: async () => {
            const videos = await fetchVideos(movie.id);
            const images = await fetchImages(movie.id);
            setVideos((prev) =>
                videos.videos || []
            );
            setCountVid((prev) => videos.totalCount || 0)
            setImages((prev) =>
                images.images || []
            );
            setCountImg((prev) => images.totalCount || 0)
            const data = { images: images.images, videos: videos.videos }
            return data;
        },
        placeholderData: keepPreviousData, // biar gak flicker saat pagination
    });

    return (
        <>
            <Grid display="flex" gap={4} marginBottom={1}>
                <Grid size='grow'>
                    <Typography sx={{
                        fontSize: {
                            xs: 32, sm: 48
                        }, lineHeight: '2rem'
                    }}>
                        {movie.primaryTitle}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {movie.startYear} - {duration(movie.runtimeSeconds ?? 0)}
                    </Typography>
                </Grid>
                <Grid size='auto' sx={{
                    display: {
                        lg: 'flex',
                        xs: 'none'
                    }
                }}>
                    <Grid container justifyContent={'flex-end'}>
                        <Grid size="auto">
                            <Typography variant="caption" sx={{ letterSpacing: '0.12em' }}>
                                IMDb RATING
                            </Typography>
                            <Box display={'flex'} flexWrap={'wrap'} >
                                <Typography variant='h5'>
                                    ⭐
                                </Typography>
                                <Box>
                                    <Box display="flex" alignItems="baseline" gap={0.5}>
                                        <Typography variant="h6">{movie.rating?.aggregateRating}</Typography>
                                        <Typography variant="subtitle1">/10</Typography>
                                    </Box>
                                    <Typography variant='caption'>{voteCount(movie.rating?.voteCount ?? 0)}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid
                    size={{ lg: 'auto', sm: 3.5 }}
                    sx={{
                        borderRadius: 4, overflow: 'hidden', height: {
                            lg: 333
                        },
                        maxHeight: {
                            xs: 'none', lg: 393
                        },
                        aspectRatio: "2/3", // menjaga rasio 2:3 (300x450)
                        // flex: "1 1 auto",
                        // flexGrow: 1,
                        display: {
                            sm: 'flex', xs: 'none'
                        }
                    }}>
                    <img
                        src={movie.primaryImage?.url ?? "https://placehold.co/300x450"}
                        alt={movie.primaryTitle}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            // borderRadius: 4
                        }}
                    />
                </Grid>
                <Grid
                    size={{ lg: 'auto', sm: 8.5 }}
                    sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        height: { lg: 333 },
                        maxHeight: { xs: 'none', lg: 393 },
                        aspectRatio: "16 / 9",
                    }}
                >
                    <Link
                        href={`https://imdb.com/video/${videos[0]?.id}`}
                        sx={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}
                    >
                        <img
                            src={videos[0]?.primaryImage?.url ?? "https://placehold.co/450x300"}
                            alt={videos[0]?.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />

                        {/* overlay play + text bottom-left */}
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 8,
                                bottom: 8,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                bgcolor: 'rgba(0,0,0,0.6)',
                                color: '#fff',
                                px: 1.25,
                                py: 0.5,
                                borderRadius: 2,
                                maxWidth: '70%',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                            }}
                        >
                            {/* inline play icon */}
                            <Box
                                component="span"
                                sx={{
                                    width: 50,
                                    height: 50,
                                    // display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // borderWidth: 1,
                                    borderColor: 'white',
                                    borderRadius: 25,
                                    borderStyle: 'solid',
                                    display: {
                                        xs: 'none', md: 'inline-flex'
                                    },
                                }}
                                aria-hidden
                            >
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                                </svg>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'row', minWidth: 0 }}>
                                <Typography sx={{
                                    fontSize: {
                                        xs: 16, md: 24
                                    }
                                }}>
                                    Play trailer
                                </Typography>
                                <Typography marginLeft={1}
                                    sx={{
                                        fontSize: {
                                            xs: 16, md: 20
                                        }
                                    }}
                                >
                                    {duration2(videos[0]?.runtimeSeconds)}
                                </Typography>
                            </Box>
                        </Box>

                        {/* overlay play + text bottom-left untuk < lg */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                display: {
                                    md: 'none', xs: 'flex'
                                },
                                alignItems: 'center',
                                gap: 1,
                                // bgcolor: 'rgba(0,0,0,0.6)',
                                color: '#fff',
                                px: 1.25,
                                py: 0.5,
                                borderRadius: 2,
                                maxWidth: '70%',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                            }}
                        >
                            {/* inline play icon */}
                            <Box
                                component="span"
                                sx={{
                                    width: 50,
                                    height: 50,
                                    // display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // borderWidth: 1,
                                    borderColor: 'white',
                                    borderRadius: 25,
                                    borderStyle: 'solid',
                                    display: {
                                        xs: 'none', sm: 'inline-flex'
                                    },
                                }}
                                aria-hidden
                            >
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                                </svg>
                            </Box>
                        </Box>
                    </Link>
                </Grid>
                <Grid
                    size={{ lg: 'grow', xs: 12 }}
                    sx={{
                        // display: { lg: 'flex', xs: 'flex' },
                        display: 'flex',
                        flexDirection: { lg: 'column', xs: 'row' },
                        alignItems: 'stretch', // make children stretch vertically
                        // height: '100%', // take full height of parent
                        height: { lg: 333, xs: "auto" },
                        // width: '100%',
                        gap: 1,
                    }}
                >
                    <Grid
                        container
                        // border={1}
                        sx={{
                            flex: '1 1 auto', // allow to grow/shrink to fill parent
                            alignSelf: 'stretch',
                            width: '100%',
                            height: '100%',
                            boxSizing: 'border-box',
                            borderRadius: 4,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark'
                                    ? theme.palette.grey[800]
                                    : theme.palette.grey[300],
                        }}
                    >
                        <Grid
                            container
                            direction={{ xs: 'row', lg: 'column' }}
                            justifyContent="center"
                            alignItems="center"
                            sx={{ height: '100%', width: '100%', gap: 1 }}
                        >
                            <Grid
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: { lg: 35, xs: 16 }, // font responsif
                                    lineHeight: 1, // penting agar tidak ada jarak aneh vertikal
                                }}>
                                <VideoLibrary fontSize="inherit" />
                            </Grid>
                            <Grid >
                                <Typography variant="caption" sx={{ lineHeight: 1 }}>{countVid} VIDEOS</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        sx={{
                            flex: '1 1 auto',
                            alignSelf: 'stretch',
                            width: '100%',
                            height: '100%',
                            boxSizing: 'border-box',
                            borderRadius: 4,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark'
                                    ? theme.palette.grey[800]
                                    : theme.palette.grey[300],
                            paddingY: 1
                        }}
                    >
                        <Grid
                            container
                            direction={{ xs: 'row', lg: 'column' }}
                            justifyContent="center"
                            alignItems="center"
                            sx={{ height: '100%', width: '100%', gap: 1 }}
                        >
                            <Grid sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: { lg: 35, xs: 16 },
                                lineHeight: 1,
                            }}>
                                <PhotoLibrary fontSize="inherit" />
                            </Grid>
                            <Grid >
                                <Typography variant="caption"
                                    sx={{
                                        lineHeight: 1,
                                    }}
                                >{countImg} PHOTOS</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >

            <List>
                <ListItem sx={{ paddingX: 0, borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { sm: "row" }, // stack di mobile, sejajar di desktop
                                gap: 2,
                                alignItems: "flex-start",
                            }}
                        >
                            <Box
                                component="img"
                                src={movie.primaryImage?.url ?? "https://placehold.co/200x300"}
                                alt={movie.primaryTitle}
                                sx={{
                                    // width: { sm: 200 }, // penuh di HP, 200px di layar lebar
                                    height: 178,
                                    '@media (max-width:480px)': {
                                        height: 140.59,
                                    },
                                    borderRadius: 2,
                                    objectFit: "cover",
                                    // flexShrink: 0, // supaya gambar tidak mengecil
                                    display: { xs: 'flex', sm: 'none' }
                                }}
                            />
                            <Box sx={{
                                flex: 1,
                                fontSize: 16,
                                '@media (max-width:480px)': {
                                    fontSize: 14,
                                },
                            }}>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                                    {movie.genres?.map((g: any) => (
                                        <Chip key={g} label={g} />
                                    ))}
                                </Box>

                                <Typography variant='inherit'>{movie.plot}</Typography>
                            </Box>
                        </Box>
                        {/* <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                            {movie.genres?.map((g: any) => (
                                <Chip key={g} label={g} />
                            ))}
                        </Box>
                        <Typography variant='body1'>{movie.plot}</Typography> */}
                        <Box sx={{
                            display: {
                                lg: 'none', xs: 'flex'
                            },
                            marginY: 3
                        }}>
                            <Typography variant='body1'>
                                ⭐
                            </Typography>
                            <Typography variant="body1">{movie.rating?.aggregateRating}</Typography>
                            <Typography variant="body1" fontWeight='normal'>/10</Typography>
                            <Typography variant='caption' marginLeft={1}>{voteCount(movie.rating?.voteCount ?? 0)}</Typography>
                        </Box>
                    </Box>
                </ListItem>
                <ListItem sx={{ paddingX: 0, borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                    <Typography marginRight={2} fontWeight={'bold'}>Director</Typography>
                    <Link href={`https://imdb.com/video/${videos[0]?.id}`}>
                        <Typography color='info'>{movie.directors?.[0]?.displayName}</Typography>
                    </Link>
                </ListItem>
                <ListItem sx={{ paddingX: 0, borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                    <Typography marginRight={2} fontWeight={'bold'}>Writer</Typography>
                    <Link href={`https://imdb.com/video/${videos[0]?.id}`}>
                        <Typography color='info'>{movie.writers?.[0]?.displayName}</Typography>
                    </Link>
                </ListItem>
                <ListItem
                    sx={{
                        px: 0,
                        borderBottom: 1,
                        borderBottomColor: 'gray',
                        display: 'flex',
                        justifyContent: 'space-between', // ✅ kiri-kanan rata
                        alignItems: 'center',            // ✅ vertikal sejajar
                    }}
                >
                    {/* Kiri: Label dan daftar aktor */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Typography marginRight={2} fontWeight={'bold'}>Stars</Typography>

                        {(movie.stars ?? []).map((item, index, arr) => {
                            const isLast = index === arr.length - 1;

                            return (
                                <React.Fragment key={item.id ?? index}>
                                    <Link
                                        href={`https://imdb.com/name/${item.id}`}
                                        underline="hover"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{ textDecoration: "none" }}
                                    >
                                        <Typography
                                            component="span"
                                            color="info.main"
                                            variant="body1"
                                            sx={{ fontWeight: 500 }}
                                        >
                                            {item.displayName}
                                        </Typography>
                                    </Link>

                                    {!isLast && (
                                        <Typography
                                            component="span"
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ mx: 1 }}
                                        >
                                            –
                                        </Typography>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </Box>

                    {/* Kanan: Chevron */}
                    <ChevronRight fontSize="medium" color="action" />
                </ListItem>
            </List>
            {/* <Box display="flex" gap={4} flexWrap="wrap">
                <img
                    src={movie.primaryImage?.url ?? "https://placehold.co/300x450"}
                    alt={movie.primaryTitle}
                    style={{ height: "300px", borderRadius: "8px" }}
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
                        {movie.genres?.map((g: any) => (
                            <Chip key={g} label={g} />
                        ))}
                    </Box>
                </Box>
            </Box> */}
        </>
    )
}
