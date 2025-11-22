import { Box, Typography } from "@mui/material";

function PlayIcon({ show }: { show: any }) {
    return (
        <Box
            component="span"
            sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "2px solid white",
                display: show,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7L8 5z" />
            </svg>
        </Box>
    );
}

function PlayOverlay({
    show,
    text,
    duration,
}: {
    show: any;
    text: string;
    duration: string;
}) {
    return (
        <Box
            sx={{
                position: "absolute",
                left: 8,
                bottom: 10,
                display: show,
                alignItems: "center",
                gap: 1,
                bgcolor: "rgba(0,0,0,0.5)",
                color: "#fff",
                px: 1.25,
                py: 0.5,
                borderRadius: 2,
                maxWidth: "70%",
                overflow: "hidden",
            }}
        >
            {/* <PlayIcon /> */}
            <PlayIcon show={"inline-flex"} />

            <Typography sx={{ fontSize: { sm: 14, md: 18, lg: 24 } }}>
                {text}
            </Typography>
            <Typography sx={{ fontSize: { sm: 14, md: 16, lg: 20 } }}>
                {duration}
            </Typography>
        </Box>
    );
}

export {
    PlayIcon,
    PlayOverlay
}