import {
    Box, Chip, Grid, Link, List, ListItem, Typography
} from "@mui/material";
import { PhotoLibrary, VideoLibrary } from "@mui/icons-material";
import { CSSProperties } from "react";
import { duration, duration2, formatDate, voteCount } from "../../helpers/Converter";
import NameList from "../NameList";
import { Data, MovieInterest } from "../../types/Movie";
import { StatsPanel } from "./HeroBanner/Stats";
import { PlayCenterOverlay, PlayOverlay } from "./HeroBanner/PlayButton";

export default function HeroBanner({ data }: { data: Data }) {
    const { movie, videos, images, countImg, countVid, name } = data;

    const posterUrl = movie?.primaryImage?.url ?? "https://placehold.co/300x450?text=Poster+not+available";
    const trailer = videos?.filter(i => i.name.toLowerCase().includes('trailer'))[0];
    const trailerImg = trailer?.primaryImage?.url ?? "https://placehold.co/450x300?text=Video+not+available";

    return (
        <>
            {/* --- Title + Rating Top --- */}
            <Grid display="flex" gap={4} mb={1}>
                <Grid flexGrow={1}>
                    <Typography sx={{ fontSize: { xs: 32, sm: 48 }, lineHeight: "2rem", py: 1 }}>
                        {name ? name.displayName : movie?.primaryTitle}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ textTransform: name ? 'capitalize' : undefined }}>
                        {name ? name.primaryProfessions?.join(' - ') : `${movie?.startYear} — ${duration(movie?.runtimeSeconds ?? 0)}`}
                    </Typography>
                </Grid>

                {/* Rating — tampil di desktop */}
                {!name && (
                    <Grid sx={{ display: { xs: "none", lg: "flex" } }}>
                        <Grid container justifyContent="flex-end">
                            <Grid>
                                <Typography variant="caption" letterSpacing="0.12em">
                                    IMDb RATING
                                </Typography>
                                <Box display="flex" flexWrap="wrap">
                                    <Typography variant="h5">⭐</Typography>
                                    <Box>
                                        <Box display="flex" alignItems="baseline" gap={0.5}>
                                            <Typography variant="h6">{movie?.rating?.aggregateRating}</Typography>
                                            <Typography variant="subtitle1">/10</Typography>
                                        </Box>
                                        <Typography variant="caption">
                                            {voteCount(movie?.rating?.voteCount ?? 0)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                )}

            </Grid>

            {/* --- Media Row --- */}
            <Grid container spacing={1}>
                {/* Poster */}
                <Grid
                    size={{ lg: "auto", sm: 3.5 }}
                    sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        height: { lg: 333 },
                        maxHeight: { xs: "none", lg: 393 },
                        aspectRatio: "2/3",
                        display: { xs: "none", sm: "flex" },
                    }}
                >
                    {name ? (
                        <img src={name?.primaryImage?.url} alt={name?.displayName} style={imgFill} />
                    ) : (
                        <img src={posterUrl} alt={movie?.primaryTitle} style={imgFill} />
                    )}
                </Grid>

                {/* Trailer */}
                <Grid
                    size={{ lg: "auto", sm: 8.5 }}
                    sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        height: { lg: 333 },
                        maxHeight: { xs: "none", lg: 393 },
                        aspectRatio: "16/9",
                        position: "relative",
                    }}
                >
                    <Link
                        href={name ? '#' : `https://imdb.com/video/${trailer?.id}`}
                        sx={{ display: "block", width: "100%", height: "100%" }}
                    >
                        <img src={trailerImg} alt={trailer?.name} style={imgFill} />

                        {/* Desktop play overlay */}
                        {!name && (
                            <>
                                <PlayOverlay
                                    show={{ xs: "none", md: "flex" }}
                                    text="Play trailer"
                                    duration={duration2(trailer?.runtimeSeconds!)}
                                />

                                {/* Mobile play overlay */}
                                <PlayCenterOverlay show={{ xs: "flex", md: "none" }} text="Play trailer"
                                    duration={duration2(trailer?.runtimeSeconds!)} />
                            </>
                        )}

                    </Link>
                </Grid>

                {/* Counts (videos & photos) */}
                <StatsPanel countVid={countVid!} countImg={countImg!} />
            </Grid>

            {/* --- Description --- */}
            <List>
                <ListItem
                    id="plot"
                    sx={{
                        px: 0,
                        borderBottom: "1px solid gray",
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { sm: "row" },
                                gap: 2,
                                alignItems: "flex-start",
                            }}
                        >
                            {/* Mobile poster */}
                            {name ? (<Box
                                component="img"
                                src={name?.primaryImage?.url}
                                alt={name?.displayName}
                                sx={{
                                    height: 178,
                                    "@media (max-width:480px)": { height: 140.59 },
                                    borderRadius: 2,
                                    objectFit: "cover",
                                    display: { xs: "flex", sm: "none" },
                                }}
                            />) : (<Box
                                component="img"
                                src={posterUrl}
                                alt={movie?.primaryTitle}
                                sx={{
                                    height: 178,
                                    "@media (max-width:480px)": { height: 140.59 },
                                    borderRadius: 2,
                                    objectFit: "cover",
                                    display: { xs: "flex", sm: "none" },
                                }}
                            />)}


                            <Box sx={{ flex: 1, fontSize: { xs: 14, sm: 16 } }}>
                                {!name && (
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                                        {movie?.interests?.map((g: MovieInterest) => (
                                            <Link
                                                href={`/interest/${g.id}`}>
                                                <Chip key={g.id} label={g.name} />
                                            </Link>
                                        ))}
                                    </Box>
                                )}

                                <Typography
                                    variant="inherit"
                                    sx={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 5,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        cursor: "pointer",
                                        "&:hover": { opacity: 0.8 },
                                    }}
                                    onClick={(e) => {
                                        const el = e.currentTarget;
                                        el.style.webkitLineClamp = el.style.webkitLineClamp === "5" ? "unset" : "5";
                                    }}
                                >
                                    {name ? name.biography : movie?.plot}
                                </Typography>
                                {name && (<>
                                    <Typography variant='inherit' fontWeight={'bold'} marginTop={2}>Born  <Typography variant='inherit' component={'span'} fontWeight={'light'}>{formatDate(name?.birthDate?.day!, name?.birthDate?.month!, name?.birthDate?.year!)}</Typography></Typography>
                                    {name?.deathDate && (
                                        <Typography variant='inherit' fontWeight={'bold'} marginTop={2}>Dead  <Typography variant='inherit' component={'span'} fontWeight={'light'}>{formatDate(name?.deathDate?.day!, name?.deathDate?.month!, name?.deathDate?.year!)} - ({name.deathReason})</Typography></Typography>
                                    )}
                                </>)}
                            </Box>
                        </Box>

                        {/* Mobile rating */}
                        {!name && (
                            <Box sx={{ display: { xs: "flex", lg: "none" }, my: 3 }}>
                                <Typography variant="body1">⭐</Typography>
                                <Typography variant="body1">{movie?.rating?.aggregateRating}</Typography>
                                <Typography variant="body1" fontWeight="normal">
                                    /10
                                </Typography>
                                <Typography variant="caption" ml={1}>
                                    {voteCount(movie?.rating?.voteCount ?? 0)}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </ListItem>
                {!name && (<>
                    <NameList label="Director" names={movie?.directors!} />
                    <NameList label="Writer" names={movie?.writers!} />
                    <NameList label="Star" names={movie?.stars!} action />
                </>)}
            </List>
        </>
    );
}
/* --------------------------------- Subcomponents --------------------------------- */

const imgFill: CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };