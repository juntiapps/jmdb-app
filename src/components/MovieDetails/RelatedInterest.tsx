import React from 'react'
import { Interest, MovieInterest } from '../../types/Movie'
import SectionTitle from '../SectionTitle'
import InterestGrid from '../InterestGrid'

export default function RelatedInterest({ interests }: { interests: Interest[] }) {
    return (
        <>
            <SectionTitle title='Related Interests' length={interests.length} />
            <InterestGrid interests={interests}/>
        </>
    )
}
