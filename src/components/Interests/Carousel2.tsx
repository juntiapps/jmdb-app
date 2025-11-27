import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useRef, useState } from "react";
import { Interest, Movie } from "../../types/Movie";
import { Calculate } from "@mui/icons-material";

export default function ShovelerCarousel2({ items }: { items: Movie[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const [compressed, setCompressed] = useState<{ [key: string]: string }>({});

    // --- Compress semua gambar sekali saat awal ---
    useEffect(() => {
        (async () => {
            const results: any = {};
            for (const item of items) {
                try {
                    const small = await compressImageUrl(item.primaryImage?.url!, 300);
                    results[item.primaryImage?.url!] = small;
                } catch {
                    results[item.primaryImage?.url!] = item.primaryImage?.url!; // fallback
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
                {items.map((item, i) => {
                    const imgSrc = compressed[item.primaryImage?.url!] || item.primaryImage?.url!;
                    return (
                        <Box
                            key={item.id}
                            sx={{
                                flex: "0 0 auto",
                                width: 'calc(100vw / 6)',
                                scrollSnapAlign: "start",
                                cursor: "pointer",
                                backgroundColor: 'background.default',
                                borderRadius: 2,
                            }}
                            onClick={() => {
                                window.location.href = `/title/${item.id}`;
                            }}
                        >
                            <Box
                                component="img"
                                src={imgSrc}
                                alt={item.primaryImage?.url!}
                                sx={{
                                    width: "100%",
                                    height: '80%',
                                    objectFit: "cover",
                                    borderRadius: 2,
                                }}
                                loading="lazy"
                            />
                            <Box sx={{ padding: 1 }} >
                                <Typography sx={{ fontWeight: 500 }} noWrap>
                                    {item.primaryTitle}
                                </Typography>
                                <Typography variant="body1">⭐ {item.rating?.aggregateRating}</Typography>
                            </Box>
                        </Box>
                    )
                })}
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
