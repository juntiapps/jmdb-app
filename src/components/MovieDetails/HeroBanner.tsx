import { Box, Chip, Grid, Link, List, ListItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Images, Movie, Video } from '../../types/Movie';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchImages, fetchVideos } from '../../api/imdb';
import { PhotoLibrary, VideoLibrary } from '@mui/icons-material';

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
                    <Typography variant="h3">
                        {movie.primaryTitle}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {movie.startYear} - {duration(movie.runtimeSeconds ?? 0)}
                    </Typography>
                </Grid>
                <Grid size='auto'>
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
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // borderWidth: 1,
                                    borderColor: 'white',
                                    borderRadius: 25,
                                    borderStyle: 'solid'
                                }}
                                aria-hidden
                            >
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                                </svg>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'row', minWidth: 0 }}>
                                <Typography variant="h5">
                                    Play trailer
                                </Typography>
                                <Typography variant="h6" marginLeft={1}>
                                    {duration2(videos[0]?.runtimeSeconds)}
                                </Typography>
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
                            backgroundColor: 'lightgrey'
                        }}
                    >
                        <Grid
                            container
                            direction={{ xs: 'row', lg: 'column' }}
                            justifyContent="center"
                            alignItems="center"
                            sx={{ height: '100%', width: '100%', gap: 1 }}
                        >
                            <Grid >
                                <VideoLibrary fontSize="large" />
                            </Grid>
                            <Grid >
                                <Typography variant="caption">{countVid} VIDEOS</Typography>
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
                            backgroundColor: 'lightgrey'
                        }}
                    >
                        <Grid
                            container
                            direction={{ xs: 'row', lg: 'column' }}
                            justifyContent="center"
                            alignItems="center"
                            sx={{ height: '100%', width: '100%', gap: 1 }}
                        >
                            <Grid >
                                <PhotoLibrary fontSize="large" />
                            </Grid>
                            <Grid >
                                <Typography variant="caption">{countImg} PHOTOS</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                {movie.genres?.map((g: any) => (
                    <Chip key={g} label={g} />
                ))}
            </Box>
            <List>
                <ListItem sx={{ paddingX: 0, borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                    <Typography variant='body1'>{movie.plot}</Typography>

                </ListItem>
                <ListItem sx={{ paddingX: 0, borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                    <Typography marginRight={3}>Director</Typography>
                    <Link href={`https://imdb.com/video/${videos[0]?.id}`}>
                        <Typography color='info'>{movie.directors?.[0]?.displayName}</Typography>
                    </Link>
                </ListItem>
                <ListItem sx={{ paddingX: 0, borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                    <Typography marginRight={3}>Writer</Typography>
                    <Link href={`https://imdb.com/video/${videos[0]?.id}`}>
                        <Typography color='info'>{movie.writers?.[0]?.displayName}</Typography>
                    </Link>
                </ListItem>
                <ListItem sx={{ paddingX: 0, borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                    <Typography marginRight={3}>Stars</Typography>
                        {(movie.stars ?? []).map((item, index, arr) => {
                            const isLast = index === arr.length - 1;
    
                            return (
                                <React.Fragment key={item.id ?? index}>
                                    <Link
                                        href={`https://imdb.com/name/${item.id}`} // ✅ lebih akurat untuk aktor
                                        underline="hover"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{ textDecoration: "none" }}
                                    >
                                        <Typography
                                            component="span"
                                            color="info"
                                            variant="body2"
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
