import React from 'react'
import { Name, Rel, Relationship } from '../../types/Movie'
import SectionTitle from '../SectionTitle'
import NameList from '../NameList'
import { formatDate, formatHeight } from '../../helpers/Converter'



export default function PersonalDetail({ name, relationship }: { name: Name, relationship: Relationship }) {

    const birthday = name?.birthDate || { day: 1, month: 1, year: 1970 }
    const alt = name.alternativeNames.map((item, index) => ({
        id: (index + 1).toString(),
        displayName: item
    }))

    const spouses = relationship?.relationships.filter(i => i.relationType == 'spouse')
    const children = relationship?.relationships.filter(i => i.relationType == 'child')

    const height = [{
        id: name.heightCm?.toString()!,
        displayName: formatHeight(name.heightCm!)
    }]

    const birth = [
        {
            id: birthday.year.toString()!,
            displayName: formatDate(birthday.day, birthday.month, birthday.year)
        },
        {
            id: 'place',
            displayName: name.birthLocation!
        }
    ]

    const spouse = mapData(spouses)
    const child = children.map(i => ({
        id: i.name.id,
        displayName: i.name.displayName
    }))

    console.log(spouse,child)


    return (
        <>
            <SectionTitle action={false} title='Personal details'></SectionTitle>
            <NameList names={alt} label='Alternative Name' linkDisabled />
            <NameList names={height} label='Height' linkDisabled />
            <NameList names={birth} label='Born' linkDisabled />
            <NameList names={spouse} label='Spouse' />
            <NameList names={child} label='Children' />
        </>
    )
}


function mapData(items: Rel[]) {
    const result: { id: string, displayName: string }[] = [];

    items.forEach((item, index) => {
        // 1. Push item utama
        result.push({
            id: item.name.id,
            displayName: item.name.displayName
        });

        // 2. Jika ada "att", tambahkan satu item baru
        if (Array.isArray(item.attributes) && item.attributes.length > 0) {
            result.push({
                id: `att${index + 1}`,
                displayName: `(${item.attributes.join(",")})`
            });
        }
    });

    return result;
}
