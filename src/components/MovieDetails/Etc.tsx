import React from 'react'
import { Genre, Movie, MovieDirector, MovieWriter, Name, TopCast } from '../../types/Movie'
import SectionTitle from '../SectionTitle'
import AvatarGrid from '../AvatarGrid'
import NameList from '../NameList'
import { List, ListItem, Typography } from '@mui/material'
import { ChevronRight } from '@mui/icons-material'

export default function Etc({ movie }: { movie: Movie }) {

    const genres = movie?.genres?.map((item: string, index: number) => ({
        id: index+1,
        displayName: item
    })) as unknown as Genre[]

    const nameLink = 'https://imdb.com/name'
    const genreLink = '/search?genres='
    const parentalLink = `/movie/${movie?.id}/parentalGuide`
    const fullCreditLink = `/movie/${movie?.id}/fullCredits`

    return (
        <List>
            <NameList label='Director' names={movie.directors} linkTemplate={nameLink}/>
            <NameList label='Writer' names={movie.writers} linkTemplate={nameLink}/>
            <NameList label='All cast & crew' names={[]} action linkAction={fullCreditLink}/>
            <NameList label='Genre' names={genres} linkTemplate={genreLink}/>
            <NameList label='Motion Picture Rating (MPA)' names={[]} action linkAction={parentalLink}/>
            <NameList label='Parental guide' names={[]} action linkAction={parentalLink}/>

        </List>
    )
}
