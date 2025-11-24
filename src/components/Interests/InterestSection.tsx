import React from 'react'
import { Categories, Interest } from '../../types/Movie'
import SectionTitle from '../SectionTitle'
import Carousel from './Carousel'

export default function InterestSection({ categories }: { categories: Categories[] }) {
    return (
        <>
            {categories.length > 0 && categories.map((item, index) => {
                return (<React.Fragment key={index}>
                    <SectionTitle title={item.category} action={false} />
                    <Carousel items={item.interests} />
                </React.Fragment>
                )
            })}
        </>
    )
}
