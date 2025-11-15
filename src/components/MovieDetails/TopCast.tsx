import React from 'react'
import { TopCast } from '../../types/Movie'
import SectionTitle from '../SectionTitle'
import AvatarGrid from '../AvatarGrid'

export default function _TopCast({ topCast, length = 0 }: { topCast: TopCast[], length: number }) {
    return (
        <>
            <SectionTitle title='Top Cast' length={length} />
            <AvatarGrid topCast={topCast}/>
        </>

    )
}
