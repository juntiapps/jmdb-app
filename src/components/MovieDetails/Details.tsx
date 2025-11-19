import React from 'react'
import { Movie } from '../../types/Movie'
import SectionTitle from '../SectionTitle'
import NameList from '../NameList'

export default function Details({ movie }: { movie: Movie }) {
    const releaseDateLink = `/movie/${movie?.id}/releaseInfo`
    const originCountries = movie?.originCountries?.map(item => ({
        id: item.code,
        displayName: item.name
    }))

    const originTemplate = '/search?countryCodes='

    const languages = movie?.spokenLanguages?.map(item => ({
        id: item.code,
        displayName: item.name
    }))

    const languageTemplate = '/search?languageCodes='

    const productionCompany = `/movie/${movie?.id}/companyCredits`

    return (
        <>
            <SectionTitle title='Details' action={false} />
            <NameList label='Release Date' names={[]} action linkAction={releaseDateLink} />
            <NameList label='Country of origin' names={originCountries} linkTemplate={originTemplate} />
            <NameList label='Language' names={languages} linkTemplate={languageTemplate} />
            <NameList label='Also known as' names={[]} action linkAction={releaseDateLink} />
            <NameList label='Production companies' names={[]} action linkAction={productionCompany} />


        </>
    )
}
