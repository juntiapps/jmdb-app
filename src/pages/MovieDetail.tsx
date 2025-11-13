import { useParams } from "react-router-dom";
import { fetchImages, fetchVideos, getMovieById } from "../api/imdb";
import { Data } from "../types/Movie";
import {
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import HeroBanner from "../components/MovieDetails/HeroBanner";
import Videos from "../components/MovieDetails/Videos";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["movie-detail", id],
    queryFn: async (): Promise<Data> => {
      const [movie, videoData, imageData] = await Promise.all([
        getMovieById(id!),
        fetchVideos(id!),
        fetchImages(id!),
      ]);

      const countImg =
        imageData.totalCount > 99 ? "99+" : String(imageData.totalCount || "0");

      return {
        movie,
        videos: videoData.videos || [],
        countVid: videoData.totalCount || 0,
        images: imageData.images || [],
        countImg,
      };
    },
    enabled: !!id,
    placeholderData: keepPreviousData,
  });

  if (isLoading || !data?.movie) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <HeroBanner data={data} />
      <Videos length={data.countVid} videos={data.videos} />
    </Container>
  );
}
