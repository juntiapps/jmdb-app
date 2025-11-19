import React from 'react'
import SectionTitle from '../SectionTitle'
import { Typography } from '@mui/material'
import { BoxOffice as BO } from '../../types/Movie'
import { currency } from '../../helpers/Converter'

export default function BoxOffice({ boxOffice }: { boxOffice: BO }) {
    return (
        <>
            <SectionTitle title='Box office' action={false} />
            <Typography variant='body1' fontWeight={'bold'}>
                Budget
            </Typography>
            <Typography variant='body1' mb={2}>
                {currency(boxOffice.productionBudget.amount, boxOffice.productionBudget.currency)}
            </Typography>
            <Typography variant='body1' fontWeight={'bold'}>
                Gross worldwide
            </Typography>
            <Typography variant='body1'>
                {currency(boxOffice.worldwideGross.amount, boxOffice.worldwideGross.currency)}
            </Typography>
        </>
    )
}
