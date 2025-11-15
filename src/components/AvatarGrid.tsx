import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TopCast, Video } from "../types/Movie";

export default function DynamicGrid({ topCast = [] }: { topCast: TopCast[] }) {
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
    const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

    // Jika tidak ada gambar, tidak render apa pun
    if (!topCast.length) return null;

    // console.log(topCast.map(i=>i.primaryImage))

    return (
        <Grid size={{ xs: 12 }}>
            <Box
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap: 2,
                    pb: 1,
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                {topCast.map((src2, j) => (
                    <Box
                        key={j}
                        sx={{
                            flex: "0 0 auto",
                            width: isSmDown? "40%": "22%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Box
                            component="img"
                            src={src2.primaryImage?.url ?? "https://placehold.co/222X222?text=Top+Cast"}
                            alt={`Image ${j + 1}`}
                            sx={{
                                width: "100%",
                                aspectRatio: "1 / 1",
                                objectFit: "cover",
                                borderRadius: 50,
                            }}

                        />
                        <Typography
                            variant="body1"
                            sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: 14,
                            }}
                        >
                            {src2.displayName}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: 14,
                            }}
                        >
                            {src2.characters?.[0]}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Grid>
    );
}
