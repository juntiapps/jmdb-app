import { Grid } from "@mui/material";
import MovieCard from "./Card";
import { FilmoCredit } from "../../../types/Movie";

interface FilmoListProps {
    filmo: FilmoCredit[];
    name?: string
}

export default function List({ filmo,name }: FilmoListProps) {

    return (
        <Grid container spacing={2}>
            {filmo.map((item,index) => {
                const movie = item.title;
                return (
                    <Grid key={movie.id+index} size={{ xs:12 }}>
                        <MovieCard filmo={item} name={name}/>
                    </Grid>
                )
            })}
        </Grid>
    );
}
