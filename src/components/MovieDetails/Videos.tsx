import { Box, Grid } from "@mui/material";
import VideoGrid from "../VideoGrid"
import SectionTitle from "../SectionTitle";
import { Video } from "../../types/Movie";

export default function Videos({ length = 0, videos = [] }: { length: number, videos: Video[] }) {
    const vids = videos.slice(0,6)

    return (
        <>
            <SectionTitle title="Videos" length={length} />
            <VideoGrid images={vids} />
        </>
    );
}
