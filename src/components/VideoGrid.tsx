import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Video } from "../types/Movie";

export default function DynamicGrid({ images = [] }: { images: Video[] }) {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const forwardtoImdb = (id: string) => {
    window.open(`https://www.imdb.com/video/${id}`, "_blank");
  }
  // Jika tidak ada gambar, tidak render apa pun
  if (!images.length) return null;

  return (
    <Grid container spacing={2}>
      {images.map((src, i) => {
        // Default: satu kolom penuh
        let xsVal = 12
        let aspect = "16 / 9";

        if (isSmUp) {
          // ✅ Layout untuk layar > sm (desktop/tablet)
          if (images.length === 1) xsVal = 6
          else if (images.length === 2) xsVal = 6
          else if (images.length > 2) {
            if (i < 2) xsVal = 6 // dua besar atas
            else xsVal = 3 // satu kecil bawah
          }
        } else {
          // ✅ Layout untuk layar kecil (mobile)
          if (images.length === 1) xsVal = 12
          else if (images.length > 1) {
            if (i === 0) xsVal = 12 // satu besar
            else xsVal = 5.5 // satu kecil bawah
          }
        }

        const isScrollable =
          isSmDown && images.length > 1 && i === 1;
        if (isScrollable) {
          return (
            <Grid size={{ xs: 12 }} key={i}>
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
                {images.slice(1).map((src2, j) => (
                  <Box
                    key={j}
                    sx={{
                      flex: "0 0 auto",
                      width: "40%",
                      maxWidth: "70%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                      cursor: "pointer",
                    }}
                    onClick={() => forwardtoImdb(src2.id)}
                  >
                    <Box
                      component="img"
                      src={src2.primaryImage.url}
                      alt={`Image ${j + 2}`}
                      sx={{
                        width: "100%",
                        aspectRatio: "16 / 9",
                        objectFit: "cover",
                        borderRadius: 2,
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
                      {src2.name}
                    </Typography>
                  </Box>
                ))}

              </Box>
            </Grid>
          );
        }
        if (isSmDown && i > 0) return null;
        return (
          <Grid key={i} size={{ xs: xsVal }} onClick={() => forwardtoImdb(src.id)} sx={{ cursor: "pointer" }}>
            <Box
              component="img"
              src={src.primaryImage.url}
              alt={`Image ${i + 1}`}
              sx={{
                width: "100%",
                aspectRatio: aspect,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,        // ✅ batasi ke 2 baris
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {src.name}
            </Typography>

          </Grid>
        );
      })}
    </Grid>
  );
}
