import React from 'react'
import { MovieDirector, MovieWriter, Name, TopCast } from '../../types/Movie'
import SectionTitle from '../SectionTitle'
import AvatarGrid from '../AvatarGrid'
import NameList from '../NameList'
import { List, ListItem, Typography } from '@mui/material'
import { ChevronRight } from '@mui/icons-material'

export default function _TopCast({ topCast, length = 0 }: { topCast: TopCast[], length: number }) {
    return (
        <>
            <SectionTitle title='Top Cast' length={length} />
            <AvatarGrid topCast={topCast} />
            {/* <List>
                <NameList label='Director' names={directors} />
                <NameList label='Writer' names={writers} />
                <NameList label='All cast & crew' names={[]} action/>
            </List> */}
        </>
    )
}
