import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useRef, useState } from "react";
import { Interest } from "../../types/Movie";

export default function ShovelerCarousel({ items }: { items: Interest[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const [compressed, setCompressed] = useState<{ [key: string]: string }>({});

    // --- Compress semua gambar sekali saat awal ---
    useEffect(() => {
        (async () => {
            const results: any = {};
            for (const item of items) {
                try {
                    const small = await compressImageUrl(item.primaryImage.url, 300);
                    results[item.primaryImage.url] = small;
                } catch {
                    results[item.primaryImage.url] = item.primaryImage.url; // fallback
                }
            }
            setCompressed(results);
        })();
    }, [items]);

    const scroll = (offset: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
        }
    };

    return (
        <Box sx={{ width: "100%", position: "relative", mb: 4 }}>
            {/* Left Arrow */}
            <IconButton
                onClick={() => scroll(-300)}
                sx={{
                    position: "absolute",
                    top: "30%",
                    left: 0,
                    zIndex: 10,
                    bgcolor: "background.paper",
                    boxShadow: 2,
                    "&:hover": { bgcolor: "background.paper" },
                }}
            >
                <ChevronLeftIcon />
            </IconButton>

            {/* Carousel */}
            <Box
                ref={scrollRef}
                sx={{
                    display: "flex",
                    gap: 2,
                    overflowX: "auto",
                    scrollSnapType: "x mandatory",
                    px: 6,
                    py: 1,
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                {items.map((item, i) => (
                    <Box
                        key={item.id}
                        sx={{
                            flex: "0 0 auto",
                            width: 260,
                            scrollSnapAlign: "start",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            window.location.href = `/interests/${item.id}`;
                        }}
                    >
                        <Box
                            component="img"
                            src={item.primaryImage?.url}
                            alt={item.name}
                            sx={{
                                width: "100%",
                                height: 150,
                                objectFit: "cover",
                                borderRadius: 2,
                            }}
                        />
                        <Typography sx={{ mt: 1, fontWeight: 500 }} noWrap>
                            {item.name}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Right Arrow */}
            <IconButton
                onClick={() => scroll(300)}
                sx={{
                    position: "absolute",
                    top: "30%",
                    right: 0,
                    zIndex: 10,
                    bgcolor: "background.paper",
                    boxShadow: 2,
                    "&:hover": { bgcolor: "background.paper" },
                }}
            >
                <ChevronRightIcon />
            </IconButton>
        </Box>
    );
}
