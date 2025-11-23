import React, { useEffect, useState } from 'react'
import { AwardNominationStats } from '../../types/Movie'
import SectionTitle from '../SectionTitle'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import { ChevronRight } from '@mui/icons-material';

export default function AwardNomination({ data }: { data: AwardNominationStats }) {
    const theme = useTheme();
    const [string, setString] = useState('')

    useEffect(() => {
        if (data) {
            let str = data.winCount + " win"
            if (data.winCount > 1) str += "s"
            str += " & " + data.nominationCount + " nomination"
            if (data.nominationCount > 1) str += "s"
            str += " total"
            setString(str)
        }
    }, [])


    return (
        <Box sx={{
            display: 'flex',
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 1,
            flexDirection: 'row',
            overflow: 'hidden',
            // height: 33,
            my: 3,
            borderTop: {
                xs: `25px solid ${theme.palette.primary.main}`,
                sm: `1px solid ${theme.palette.primary.main}`
            },
            padding: {
                xs: `4px 0px 4px 16px`,
                sm: 0
            }
            // alignItems: 'center'
        }}>
            {/* <Box
                sx={{
                    width:20,
                    backgroundColor: theme.palette.primary.main
                }}
            /> */}
            <Box
                sx={{
                    position: "relative",
                    width: 10,                        // alas atas
                    overflow: "visible",
                    mr: 4,
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        backgroundColor: theme.palette.primary.main,

                        /* ini yang membuat trapesium */
                        transform: "skewX(-20deg)",     // sudut trapesium
                        transformOrigin: "top left",
                        width: "calc(100% + 20px)",     // tambah lebar bawah
                    },
                    display: {
                        xs: 'none',
                        sm: 'flex'
                    }
                }}
            />
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <Grid container spacing={1}>
                    <Grid size={'auto'}>
                        <Typography variant='body1' fontWeight={'bold'} mr={2}>Awards</Typography>
                    </Grid>
                    <Grid size={'auto'}>
                        <Typography variant='body1'>{string}</Typography>
                    </Grid>
                </Grid>
                <ChevronRight sx={{
                    fontSize: 30,
                    verticalAlign: 'middle', // ini bantu jaga posisi icon
                }} color="action" />
            </Box>
        </Box>
    )
}
