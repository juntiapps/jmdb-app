import { Grid } from '@mui/material'
import React from 'react'
import { Video } from '../../types/Movie'
import VideoGrid from './VideoGrid'

export default function VideoList({ videos }: { videos: Video[] }) {
    return (
        <Grid container spacing={2}>
            {videos.map((video) => (
                <Grid key={video.id} size={{ xs: 12, sm: 6 }}>
                    <VideoGrid video={video} />
                </Grid>
            ))}
        </Grid>
    )
}
