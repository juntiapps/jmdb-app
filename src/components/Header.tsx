import React from 'react'
import { Movie, Name } from '../types/Movie'
import { Typography, Box, useTheme, Container, Grid } from '@mui/material'
import { ChevronLeft } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useColorMode } from '../theme/ThemeContext'

interface HeaderProps {
    name?: Name,
    movie?: Movie,
    page: string,
    type?: 'movie' | 'name'
}

export default function Header<T>({ movie, name, type = 'movie', page }: HeaderProps) {
    const { mode } = useColorMode()
    const title = type === 'movie' ? movie?.primaryTitle : name?.displayName
    // const page = 'Video'
    const bg = type === 'movie' ? movie?.primaryImage?.url : name?.primaryImage.url // ganti sesuai field
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                p: 2,
                minHeight: 150,

                // Background image
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',

                // Blur & Saturate overlay
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backdropFilter: 'blur(50px) saturate(1)', // saturate(2) = 200%
                    WebkitBackdropFilter: 'blur(50px) saturate(1)',
                    background: mode === 'dark' ? 'rgba(71,71,71,0.5)' : undefined
                }
            }}
        >
            <Container sx={{ px: 0 }}>

                {/* CONTENT */}
                <Box sx={{ position: 'relative', zIndex: 10 }}>

                    {/* Back Button */}
                    <Box
                        onClick={() => type === 'movie' ? navigate('/movie/' + movie?.id) : navigate('/name/' + name?.id)}
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
                        <Typography>Back</Typography>
                    </Box>


                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2
                    }}>
                        <Box
                            component='img'
                            src={bg}
                            sx={{
                                aspectRatio: '2/3',
                                width: '17.25%',
                                borderRadius: '8px',
                                display: 'flex',
                                "@media (max-width:479px)": { display: 'none' },

                            }}
                        />
                        <Box sx={{ flexDirection: 'column', display: 'flex', width: '100%' }}>
                            {/* Title */}
                            <Typography sx={{
                                fontWeight: 'bold',
                                fontSize: '20px',
                                "@media (max-width:479px)": { fontSize: '16px' },
                                display: 'flex',
                                flex: 1,
                                alignItems: 'end',
                            }}>
                                {title}
                            </Typography>

                            {/* Page label */}
                            <Typography sx={{
                                fontWeight: 'bold',
                                fontSize: { xs: '28px', sm: '42px' }
                            }}>
                                {page}
                            </Typography>
                        </Box>

                    </Box>

                </Box>
            </Container>
        </Box>
    )
}
