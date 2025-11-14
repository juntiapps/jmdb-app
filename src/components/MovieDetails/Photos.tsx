import { Box, Grid } from "@mui/material";
import ImageGrid from "../ImageGrid"
import SectionTitle from "../SectionTitle";
import { Images, Video } from "../../types/Movie";
import { useQuery } from "@tanstack/react-query";
import { fetchValidImages } from "../../utils/fetchValidImages";

export default function Photos({ length = 0, images = [] }: { length: number, images: Images[] }) {

    // const imgs = images.slice(0,7)
    const { data: validImages = [], isLoading, isFetching } = useQuery({
        queryKey: ["validImages", images],
        queryFn: () => fetchValidImages(images, 7),
        enabled: images.length > 0, // jangan fetch kalau kosong
        staleTime: 1000 * 60 * 10, // cache 10 menit
    });

    if (isLoading || isFetching) return <p>Loading...</p>;

    return (
        <>
            <SectionTitle title="Photos" length={length} />
            <ImageGrid images={validImages} length={length} />
        </>
    );
}
