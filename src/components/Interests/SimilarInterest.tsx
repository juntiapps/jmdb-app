import React from 'react'
import { Categories, Interest } from '../../types/Movie'
import SectionTitle from '../SectionTitle'
import Carousel from './Carousel'
import { Box } from '@mui/material'

export default function SimilarInterest({ interest }: { interest: Interest[] }) {
    return (
        <Box sx={{ py: 1 }}>
            <SectionTitle title='Similar Interests' action={false} />
            <Carousel items={interest} />
        </Box>
    )
}
