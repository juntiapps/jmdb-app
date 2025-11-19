import { PhotoLibrary, VideoLibrary } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";


function StatsPanel({ countVid, countImg }: { countVid: number; countImg: string }) {
    const navigate = useNavigate();
    const panelStyle = (theme: any) => ({
        flex: "1 1 auto",
        borderRadius: 4,
        backgroundColor:
            theme.palette.mode === "dark"
                ? theme.palette.grey[800]
                : theme.palette.grey[300],
        height: { lg: 333, xs: "auto" },
        cursor: 'pointer'
    });

    const onClick = (to: string) => {
        navigate(to)
    }

    return (
        <Grid
            size={{ lg: "grow", xs: 12 }}
            sx={{
                display: "flex",
                flexDirection: { lg: "column", xs: "row" },
                gap: 1,
                height: { lg: 333, xs: "auto" },
            }}
        >
            {/* Videos box */}
            <StatsItem
                icon={<VideoLibrary fontSize="inherit" />}
                count={`${countVid} VIDEOS`}
                sx={panelStyle}
                onClick={() => onClick('videogallery')}
            />

            {/* Photos box */}
            <StatsItem
                icon={<PhotoLibrary fontSize="inherit" />}
                count={`${countImg} PHOTOS`}
                sx={panelStyle}
                onClick={() => onClick('photogallery')}
            />
        </Grid>
    );
}

function StatsItem({
    icon,
    count,
    sx,
    onClick
}: {
    icon: React.ReactNode;
    count: string;
    sx: any;
    onClick: () => void
}) {
    return (
        <Grid container sx={sx} alignItems="center" justifyContent="center" p={1} onClick={onClick}>
            <Grid container direction={{ xs: "row", lg: "column" }} gap={1} alignItems="center">
                <Box sx={{ fontSize: { xs: 16, lg: 35 }, display: "flex" }}>{icon}</Box>
                <Typography variant="caption">{count}</Typography>
            </Grid>
        </Grid>
    );
}

export {
    StatsPanel
}
