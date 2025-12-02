import { Box, Button, Chip, CircularProgress, Container, IconButton } from '@mui/material';
import React, { useState, useEffect, useMemo } from 'react';
import { Images, PageInfoTypes, Photo, SortTypes, Video } from '../../types/Movie';
import { fetchImages, fetchNameImages, fetchVideos } from '../../api/imdb';
import Filter from '../Filter';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PhotoList from './PhotoList';
import { fetchValidImages } from '../../utils/fetchValidImages';
import PhotoViewer from './PhotoViewer';
import { useSearchParams } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2) },
    '& .MuiDialogActions-root': { padding: theme.spacing(1) },
    '& .MuiPaper-root': { width: '80%', maxWidth: 'none' },
}));

export default function DataGrid({ id, type = 'movie' }: { id: string, type?: 'movie' | 'name' }) {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const [photos, setPhotos] = useState<Images[]>([]);
    const [pageToken, setPageToken] = useState<string | null>(null);
    const [nextPageToken, setNextPageToken] = useState<string | null>(null);
    const [pageInfo, setPageInfo] = useState<PageInfoTypes>({ from: 0, to: 0, total: 0 });
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [showViewer, setShowViewer] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<string>('all');
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [isFiltering, setIsFiltering] = useState<boolean>(false);
    const [selectedPhoto, setSelectedPhoto] = useState<Images | null>(null);

    // Filter yang dikirim ke API
    const filterType = selectedType === 'all' ? undefined : selectedType;

    // Hitung jumlah per tipe
    const typeCounts = useMemo(() => {
        return photos.reduce((acc, photo) => {
            acc[photo.type] = (acc[photo.type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [photos]);

    const typeList = useMemo(() =>
        Object.entries(typeCounts)
            .map(([type, count]) => ({ type, count }))
            .sort((a, b) => b.count - a.count),
        [typeCounts]
    );

    // Fungsi fetch utama
    const loadPhotos = async (isLoadMore = false) => {
        if (!isLoadMore && !loadingMore) {
            setLoading(true);
            setIsFiltering(true); // Dialog tetap buka
        } else {
            setLoadingMore(true);
        }

        try {
            let data: { images: Images[], nextPageToken?: string, totalCount?: number };
            if (type === 'name') {
                data = await fetchNameImages(id, filterType, isLoadMore ? pageToken || undefined : undefined);
            } else {
                data = await fetchImages(id, filterType, isLoadMore ? pageToken || undefined : undefined);
            }

            const validImages = await fetchValidImages(data.images, 20)

            setPhotos(prev => {
                const newList = isLoadMore ? [...prev, ...(validImages || [])] : (validImages || []);

                setPageInfo({
                    from: newList.length === 0 ? 0 : 1,
                    to: newList.length,
                    total: data.totalCount || newList.length,
                });

                return newList;
            });

            setNextPageToken(data.nextPageToken || null);
            if (isLoadMore) {
                setPageToken(data.nextPageToken || null);
            } else {
                setPageToken(data.nextPageToken || null);
            }
        } catch (err) {
            console.error("Failed to fetch photos:", err);
        } finally {
            setLoading(false);
            setLoadingMore(false);
            setIsFiltering(false);
        }
    };

    // Fetch saat filter / id berubah
    useEffect(() => {
        setPhotos([]);
        setPageToken(null);
        setNextPageToken(null);
        loadPhotos(false);
        if (query) {
            onClickPhoto({ url: query, width: 1920, height: 1080, type: 'custom' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, filterType, query]);

    // Load more
    const loadMore = () => {
        if (nextPageToken && !loadingMore) {
            loadPhotos(true);
        }
    };

    // Toggle filter dialog
    // const onHandleFilter = () => setShowFilter(prev => !prev);
    const onHandleFilter = () => {
        if (isFiltering) return; // Cegah tutup saat lagi filter
        setShowFilter(prev => !prev);
    };
    // Pilih tipe
    const onSelectType = (type: string) => {
        setSelectedType(prev => (prev === type ? 'all' : type));
        // setShowFilter(false);
    };

    const onClickPhoto = (photo: Images) => {
        setSelectedPhoto(photo);
        setShowViewer(true);
    }

    return (<>
        <Container sx={{ py: 4 }}>
            <Filter pageInfo={pageInfo} onOpenFilter={onHandleFilter} />

            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <PhotoList photos={photos} onClickPhoto={onClickPhoto} />
            )}

            {nextPageToken && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={loadMore}
                        disabled={loadingMore}
                    >
                        {loadingMore ? "Loading More..." : "Load More"}
                    </Button>
                </Box>
            )}

            <BootstrapDialog open={showFilter} onClose={onHandleFilter}
                disableEscapeKeyDown={isFiltering}
                hideBackdrop={isFiltering}
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Filter
                    <IconButton
                        onClick={onHandleFilter}
                        disabled={isFiltering}
                        sx={{ position: 'absolute', right: 8, top: 8, color: theme => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <Typography sx={{ mb: 2, fontWeight: 'bold' }}>PHOTO TYPE</Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {isFiltering ? <CircularProgress /> : typeList.map(item => {
                            const label = item.type.replaceAll("_", " ")
                            return (
                                <Chip
                                    key={item.type}
                                    label={`${label} · ${item.count}`}
                                    onClick={() => { onSelectType(item.type) }}
                                    color={selectedType === item.type ? "primary" : "default"}
                                    sx={{ textTransform: 'capitalize', cursor: 'pointer' }}
                                />
                            )
                        })}
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </Container>
        {selectedPhoto && <PhotoViewer photo={selectedPhoto!} open={showViewer} setOpen={setShowViewer} />}
    </>
    );
}