import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Images } from "../types/Movie";

export default function DynamicGrid({
  images = [],
  length = 0,
}: {
  images: Images[];
  length: number;
}) {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  if (!images.length) return null;

  // =========================
  //  Mapping Layout xs value
  // =========================
  const xsMap = (len: number, i: number) => {
    if (len === 1) return 12;
    if (len === 2) return i === 0 ? 5.5 : 6.5;
    if (len === 3) return i < 2 ? 3.75 : 4.5;

    // default (len ≥ 4)
    if (i < 2) return 3.75;
    if (i === 2) return 4.5;
    if (i === 6) return 2.1;
    return 3.3;
  };

  // Overlay
  const showAppend = length > 7;
  const appendNum = "+" + (length - 7);

  return (
    <Grid container spacing={isSmDown ? 1 : 2}>
      {images.map((src, i) => {
        const xsVal = xsMap(images.length, i);
        const isAppendTarget = showAppend && i === 6;

        return (
          <Grid
            key={i}
            size={i < 6 && i > 2 ? "grow" : { xs: xsVal }}
            sx={{
              position: "relative",
              width: i === 6 ? 100 : undefined,
              height: i < 3 ? "calc(100vw * 0.2)" : undefined,
              display: isSmDown && i === 6 ? "none" : undefined,
            }}
          >
            <Box
              component="img"
              src={src.url}
              alt={`Image ${i + 1}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 2,
              }}
            />

            {isAppendTarget && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0,0,0,0.4)",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography color="white">{appendNum}</Typography>
              </Box>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}
