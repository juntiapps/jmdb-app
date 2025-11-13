import { Box, Grid } from "@mui/material";
import VideoGrid from "../VideoGrid"
import SectionTitle from "../SectionTitle";
import { Video } from "../../types/Movie";

export default function Videos({ length = 0, videos = [] }: { length: number, videos: Video[] }) {
    const images: any = [
        "https://placehold.co/800x450?text=Image+1",
        "https://placehold.co/800x450?text=Image+2",
        "https://placehold.co/400x225?text=Image+3",
        "https://placehold.co/400x225?text=Image+4",
        "https://placehold.co/400x225?text=Image+5",
        "https://placehold.co/400x225?text=Image+6",
    ];

    const vids = videos.slice(0,6)

    return (
        <>
            <SectionTitle title="Videos" length={length} />
            <VideoGrid images={vids} />
        </>
    );
}
