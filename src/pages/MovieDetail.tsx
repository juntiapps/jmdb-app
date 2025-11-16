import { useParams } from "react-router-dom";
import { fetchAwardNomination, fetchImages, fetchTopCast, fetchVideos, getMovieById } from "../api/imdb";
import { Data } from "../types/Movie";
import {
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import HeroBanner from "../components/MovieDetails/HeroBanner";
import Videos from "../components/MovieDetails/Videos";
import Photos from "../components/MovieDetails/Photos";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import TopCast from "../components/MovieDetails/TopCast";
import AwardNomination from "../components/MovieDetails/AwardNomination";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["movie-detail", id],
    queryFn: async (): Promise<Data> => {
      const [movie, videoData, imageData, topCast, awardNomination] = await Promise.all([
        getMovieById(id!),
        fetchVideos(id!),
        fetchImages(id!),
        fetchTopCast(id!),
        fetchAwardNomination(id!)
      ]);

      const countImg =
        imageData.totalCount > 99 ? "99+" : String(imageData.totalCount || "0");

      return {
        movie,
        videos: videoData.videos || [],
        countVid: videoData.totalCount || 0,
        images: imageData.images || [],
        countImg,
        realCountImg: imageData.totalCount || 0,
        topCast,
        awardNominationStats: awardNomination.stats
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
      <AwardNomination data={data.awardNominationStats!} />
      <Videos length={data.countVid} videos={data.videos} />
      <Photos length={data.realCountImg} images={data.images} />
      <TopCast topCast={data.topCast.data} length={data.topCast.totalCount} directors={data.movie.directors!} writers={data.movie.writers!} />
    </Container>
  );
}
