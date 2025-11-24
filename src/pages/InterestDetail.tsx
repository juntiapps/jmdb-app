import React from 'react'
import { useParams } from 'react-router-dom';

export default function InterestDetail() {
    const { id } = useParams<{ id: string }>();
    return (
        <div>InterestDetail id: {id}</div>
    )
}
