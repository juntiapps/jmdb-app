import React from 'react'
import SectionTitle from '../SectionTitle'
import { Movie } from '../../types/Movie'
import { Box, Typography, useTheme } from '@mui/material'
import ShovelerCarousel2 from './Carousel2';

export default function Popular({ data, interestName }: { data: Movie[], interestName: string }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    return (
        <Box sx={{py:1}}>
            <SectionTitle title="Popular Movies" action={false} bottomMargin={false} />
            <Typography sx={{ mb: 2, color: isDark ? '#FFFFFFB3' : 'grey' }}>
                Trending in {interestName} movies
            </Typography>
            <ShovelerCarousel2 items={data} />
        </Box>
    )
}
