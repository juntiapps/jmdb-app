import React from 'react'
import { Video } from '../../types/Movie'
import { Box, Link, Typography } from '@mui/material'
import { PlayOverlay } from './PlayButton'
import { duration2 } from '../../helpers/Converter'

export default function VideoGrid({ video }: { video: Video }) {
    return (
        <Link
            href={`https://imdb.com/video/${video?.id}`}
            sx={{ display: "block", width: "100%", height: "100%", textDecoration: 'none' }}
        >
            <Box sx={{ position: 'relative' }}>
                <Box
                    component="img"
                    src={video.primaryImage.url}
                    alt={`Image ${video.name}`}
                    sx={{
                        width: "100%",
                        // height: '100%',
                        // aspectRatio: aspect,
                        objectFit: "cover",
                        borderRadius: 2,
                    }}
                />
                <PlayOverlay
                    show={"flex"}
                    text="Play trailer"
                    duration={duration2(video?.runtimeSeconds!)}
                />
            </Box>

            <Typography
                variant="body1"
                color="info.main"
                sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,        // ✅ batasi ke 2 baris
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            >
                {video.name}
            </Typography>
        </Link>
    )
}
