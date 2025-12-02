import { useParams } from "react-router-dom";
import { fetchNameImages, fetchRelationships, fetchTrivia, getNameById } from "../api/imdb";
import { Data } from "../types/Movie";
import {
    Container,
    Box,
    CircularProgress,
} from "@mui/material";
import HeroBanner from "../components/MovieDetails/HeroBanner";
import Photos from "../components/MovieDetails/Photos";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Filmography from "../components/Name/Filmography/Section";
import PersonalDetail from "../components/Name/PersonalDetail";
import DidYouKnow from "../components/Name/DidYouKnow";

export default function NameDetail() {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading } = useQuery({
        queryKey: ["name", id],
        queryFn: async (): Promise<Data> => {
            const [name, imageData, relationship, trivia] = await Promise.all([
                getNameById(id!),
                fetchNameImages(id!),
                fetchRelationships(id!),
                fetchTrivia(undefined,id!,1)
            ]);

            const countImg =
                imageData.totalCount > 99 ? "99+" : String(imageData.totalCount || "0");

            return {
                name,
                videos: [],
                countVid: 0,
                images: imageData.images || [],
                countImg,
                realCountImg: imageData.totalCount || 0,
                relationship,
                dyk: { trivia: trivia}
            };
        },
        enabled: !!id,
        placeholderData: keepPreviousData,
    });

    if (isLoading || !data?.name) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <HeroBanner data={data} />
            <Photos length={data.realCountImg!} images={data.images!} link="photogallery"/>
            <Filmography id={id!} name={data.name.displayName}/>
            <PersonalDetail name={data.name} relationship={data.relationship!}/>
            <DidYouKnow data={data.dyk!}/>
            
            {/* <TopCast topCast={data?.topCast?.data!} length={data?.topCast?.totalCount!} />
            <Etc movie={data.movie} />
            <Details movie={data.movie} />
            <BoxOffice boxOffice={data.boxOffice!} /> */}
            {/* <RelatedInterest interests={data.interests ?? []} /> */}
        </Container>
    );
}
