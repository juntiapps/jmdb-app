import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Interest } from '../types/Movie';
import { Box, CircularProgress } from '@mui/material';
import { getInterestById } from '../api/imdb';
import HeroBanner from '../components/Interests/HeroBanner';

export default function InterestDetail() {
    const { id } = useParams<{ id: string }>();
    const [interest, setInterest] = useState<Interest | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setLoading(true)
        const data = await getInterestById(id!)
        setInterest(data)
        setLoading(false)
    }

    return (
        loading ? (<Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
        </Box>) : (
            <>
                {interest && (<HeroBanner interest={interest!} />)}
            </>
        )
    )
}
