import { Box, CircularProgress, useTheme } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Images } from '../../types/Movie'

function chunkImagesByRow(images: Images[]) {
    const rows = [];
    let i = 0;

    while (i < images.length) {
        const nextSet = images.slice(i, i + 4);
        const portraitCount = nextSet.filter(img => img.width < img.height).length;
        const itemsPerRow = portraitCount >= 2 ? 4 : 3;

        rows.push(images.slice(i, i + itemsPerRow));
        i += itemsPerRow;
    }

    return rows;
}

function getRowHeight(row: Images[], maxRowHeight = 220) {
    // Ambil aspect ratio setiap foto (h/w)
    const ratios = row.map(img => img.height / img.width);

    // Ratio terbesar menentukan “foto paling portrait”
    const maxRatio = Math.max(...ratios);

    // Tinggi baris tidak boleh melebihi maxRowHeight
    return Math.min(maxRowHeight, maxRowHeight * maxRatio);
}

function justifyRow(row: Images[], containerWidth: number, targetHeight = 220) {
    // Step 1: hitung width awal berdasarkan target height
    const scaledWidths = row.map((img) => (img.width / img.height) * targetHeight);

    // Step 2: total width
    const totalWidth = scaledWidths.reduce((sum, w) => sum + w, 0);

    // Step 3: scale row supaya pas container
    const scale = containerWidth / totalWidth;

    // Step 4: final height setelah scale
    const finalHeight = targetHeight * scale;

    return { finalHeight, widths: scaledWidths.map((w) => w * scale) };
}

function useContainerWidth() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width);
        });

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return [ref, width] as const;
}


export default function PhotoList({ photos, onClickPhoto }: { photos: Images[], onClickPhoto: (photo: Images) => void }) {
    const theme = useTheme();
    const rows = chunkImagesByRow(photos)
    const [containerRef, containerWidth] = useContainerWidth();

    if (containerWidth === 0) {
        return <Box ref={containerRef} sx={{ width: "100%" }} />;
    }

    return (
        <Box ref={containerRef} sx={{ width: "100%" }} >
            {rows.map((row, rowIndex) => {
                const { finalHeight, widths } = justifyRow(row, containerWidth, 220);

                return (
                    <Box
                        key={rowIndex}
                        sx={{
                            display: "flex",
                            gap: 0,
                            mb: 1,
                            // width: "calc(100% - 8px)",
                        }}
                    >
                        {row.map((img, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    width: widths[idx],
                                    height: finalHeight,
                                    flex: "0 0 auto",
                                    borderInline: `4px solid ${theme.palette.background.default}`,
                                    cursor: "pointer",
                                    position: "relative",
                                }}
                                onClick={() => onClickPhoto(img)}
                            >
                                <Box
                                    component="img"
                                    src={img.url}
                                    alt=""
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: 1,
                                        display: "block",
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                );
            })}
        </Box>
    )
}
