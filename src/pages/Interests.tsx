import { Box, CircularProgress, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InterestSection from '../components/Interests/InterestSection'
import { useQuery } from '@tanstack/react-query';
import { fetchInterests } from '../api/imdb';
import { Categories, Interest } from '../types/Movie';

export default function Interests() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)
    const data = await fetchInterests()
    setCategories(data)
    setLoading(false)
  }

  return (
    <Container>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <InterestSection categories={categories} />
      )}
    </Container>
  )
}
