import { Box, Typography } from "@mui/material";

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
                bottom: 8,
                display: show,
                alignItems: "center",
                gap: 1,
                bgcolor: "rgba(0,0,0,0.6)",
                color: "#fff",
                px: 1.25,
                py: 0.5,
                borderRadius: 2,
                maxWidth: "70%",
                overflow: "hidden",
            }}
        >
            {/* <PlayIcon /> */}
            <PlayIcon show={{ xs: "none", md: "inline-flex" }} />

            <Typography sx={{ fontSize: { sm: 14, md: 18, lg: 24 } }}>
                {text}
            </Typography>
            <Typography sx={{ fontSize: { sm: 14, md: 16, lg: 20 } }}>
                {duration}
            </Typography>
        </Box>


    );
}

function PlayCenterOverlay({
    show,
    text,
    duration,
}: {
    show: any;
    text: string;
    duration: string;
}) {
    return (<>
        <Box
            sx={{
                position: "absolute",
                // bottom: 8,
                inset: 0,
                // left: "50%",
                // transform: "translateX(-50%)",
                display: show,
                alignItems: "center",
                gap: 1,
                color: "#fff",
                bgcolor: "rgba(0,0,0,0.6)",
                px: 1.25,
                py: 0.5,
                borderRadius: 2,
                flexDirection: 'column'
            }}
        >
            {/* <PlayIcon /> */}
            <Box sx={{
                flex: 1,
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                mt:5
            }}>
                <PlayIcon show={'flex'} />
            </Box>
            <Box sx={{
                display: 'flex',
                paddingY: 1,
                width: {
                    sm: '100%',
                    xs: undefined
                }
            }}>
                <Typography sx={{ fontSize: { xs: 16, sm: 18 } }}>
                    {text}
                </Typography>
                <Typography sx={{ fontSize: { xs: 16, sm: 18 } }}>
                    {duration}
                </Typography>
            </Box>
        </Box>
    </>
    );
}

function PlayIcon({ show }: { show: any }) {
    return (
        <Box
            component="span"
            sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                border: "1px solid white",
                display: show,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7L8 5z" />
            </svg>
        </Box>
    );
}

export {
    PlayOverlay,
    PlayCenterOverlay,
    PlayIcon
}