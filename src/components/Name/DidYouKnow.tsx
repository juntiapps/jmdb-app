import React from 'react'
import SectionTitle from '../SectionTitle'
import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'
import { DidYouKnowType } from '../../types/Movie'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight } from '@mui/icons-material'

export default function DidYouKnow({ data }: { data: DidYouKnowType }) {
    const navigate = useNavigate()
    const onClick = () => {
        navigate(`/tr`)
    }
    return (
        <>
            <SectionTitle title='Did you know' action={false} />

            {data.trivia && data.trivia?.triviaEntries?.length > 0 && (
                <Grid container>
                    {/* <Grid size="grow"> */}
                    <Card
                        component={Link}
                        to="trivia"
                        sx={{
                            textDecoration: 'none',
                        }}
                    >
                        <Grid container alignItems={'center'}>
                            <Grid size="grow">

                                <CardContent>
                                    <Typography fontWeight="bold">
                                        Trivia
                                    </Typography>

                                    <Typography>
                                        {data.trivia.triviaEntries[0].text}
                                    </Typography>
                                </CardContent>
                            </Grid>
                            <Grid size='auto' sx={{px:1}}><ChevronRight/></Grid>
                        </Grid>
                    </Card>
                    {/* </Grid> */}
                    {/* <Grid size='auto'><ChevronRight /></Grid> */}
                </Grid>
            )}
        </>
    )
}
