import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 700, fontSize: { xs: 80, md: 120 } }}>
        404
      </Typography>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
        Halaman tidak ditemukan
      </Typography>

      <Typography sx={{ mb: 4, maxWidth: 400, opacity: 0.7 }}>
        Sepertinya halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </Typography>

      <Button
        variant="contained"
        size="large"
        component={RouterLink}
        to="/"
        sx={{ borderRadius: 3, px: 4 }}
      >
        Kembali ke Beranda
      </Button>
    </Box>
  );
}
