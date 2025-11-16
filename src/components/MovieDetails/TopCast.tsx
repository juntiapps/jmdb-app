import React from 'react'
import { MovieDirector, MovieWriter, Name, TopCast } from '../../types/Movie'
import SectionTitle from '../SectionTitle'
import AvatarGrid from '../AvatarGrid'
import NameList from '../NameList'
import { List, ListItem, Typography } from '@mui/material'
import { ChevronRight } from '@mui/icons-material'

export default function _TopCast({ topCast, length = 0, directors, writers }: { topCast: TopCast[], length: number, directors: MovieDirector[], writers: MovieWriter[] }) {
    return (
        <>
            <SectionTitle title='Top Cast' length={length} />
            <AvatarGrid topCast={topCast} />
            <List>
                <NameList label='Director' names={directors} />
                <NameList label='Writer' names={writers} />
                <NameList label='All cast & crew' names={[]} action/>
                {/* <ListItem
                    sx={{
                        px: 0,
                        borderBottom: 1,
                        borderBottomColor: 'gray',
                        display: 'flex',
                        justifyContent: 'space-between', // ✅ kiri-kanan rata
                        alignItems: 'center',            // ✅ vertikal sejajar
                    }}
                >
                    <Typography marginRight={2} fontWeight={'bold'}>All cast & crew</Typography>
                    <ChevronRight fontSize="medium" color="action" />
                </ListItem> */}

            </List>


        </>

    )
}
