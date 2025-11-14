import { ChevronRight } from '@mui/icons-material'
import { Box, Typography, useTheme } from '@mui/material'

export default function SectionTitle({ title = "", length = 0 }) {
    const theme = useTheme()
    return (
        <Box sx={{
            display: 'flex', // pastikan flex aktif
            flexDirection: 'row',
            alignItems: 'center',
            borderLeft: (theme) => `4px solid ${theme.palette.primary.main}`,
            px: 1,
            my: 3,
        }}>
            <Typography sx={{
                fontSize: { xs: 18, sm: 22 },
                lineHeight: 1, // penting biar text nggak ada “padding” vertikal
                mr: 2,
                fontWeight: 'bold'
            }}>
                {title}
            </Typography>
            <Typography sx={{
                fontSize: 12,
                lineHeight: 1,
                mr: 0.5,
            }}>{length}</Typography>
            <ChevronRight sx={{
                fontSize: 30,
                verticalAlign: 'middle', // ini bantu jaga posisi icon
            }} color="action" />
        </Box>
    )
}
