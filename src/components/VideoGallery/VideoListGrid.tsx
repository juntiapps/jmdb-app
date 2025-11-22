// import { Box, Button, Chip, CircularProgress, Container, Grid, IconButton } from '@mui/material'
// import React, { useState } from 'react'
// import { PageInfoTypes, SortTypes, Video } from '../../types/Movie';
// import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { fetchVideos } from '../../api/imdb';
// import VideoList from './VideoList';
// import Filter from '../Filter';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';


// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
//     '& .MuiPaper-root': {
//         width: '80%',      // 👉 Tambahkan ini
//         maxWidth: 'none',  // ❗ wajib untuk menonaktifkan batas default
//     }
// }));

// export default function DataGrid({ id }: { id: string }) {
//     const [videos, setVideos] = useState<Video[]>([]);
//     const [pageToken, setPageToken] = useState<string | null>(null);
//     const [pageInfo, setPageInfo] = useState<PageInfoTypes>({
//         from: 0,
//         to: 0,
//         total: 0
//     })
//     const [sortOrder, setSortOrder] = useState<SortTypes['sortOrder']>("desc");
//     const [showFilter, setShowFilter] = useState<boolean>(false)
//     const [selectedType, setSelectedType] = useState<string>('all');
//     const filterType = selectedType === 'all' ? undefined : selectedType;

//     const sortedVideos = React.useMemo(() => {

//         const sorted = [...videos];
//         sorted.sort((a, b) => {
//             const durA = a.runtimeSeconds ?? 0;
//             const durB = b.runtimeSeconds ?? 0;

//             return sortOrder === "asc" ? durA - durB : durB - durA;
//         });


//         return sorted;
//     }, [videos, sortOrder]);

//     const typeCounts = React.useMemo(() => {
//         return videos.reduce((acc, video) => {
//             acc[video.type] = (acc[video.type] || 0) + 1;
//             return acc;
//         }, {} as Record<string, number>);
//     }, [videos]);

//     const typeList = React.useMemo(() =>
//         Object.entries(typeCounts).map(([type, count]) => ({ type, count }))
//             .sort((a, b) => b.count - a.count)
//         , [typeCounts]);

//     const { data, isLoading, isFetching } = useQuery({
//         queryKey: ["videos", filterType],
//         queryFn: async () => {
//             // console.log('se', selectedType)
//             const data = await fetchVideos(id, filterType, pageToken || undefined);
//             // setVideos((prev) =>
//             //     pageToken ? [...prev, ...(data.videos || [])] : data.videos || []
//             // );

//             setVideos((prev) => {
//                 const newList = pageToken
//                     ? [...prev, ...(data.videos || [])]
//                     : data.videos || []

//                 // UPDATE FILTER SETELAH NEW LIST JADI
//                 setPageInfo({
//                     from: newList.length === 0 ? 0 : 1,
//                     to: newList.length,
//                     total: data.totalCount // jika API punya "total"
//                 })

//                 return newList
//             })
//             return data;
//         },
//         placeholderData: keepPreviousData, // biar gak flicker saat pagination
//     });

//     const nextPageToken = data?.nextPageToken ?? null;

//     const loadMore = () => {
//         if (nextPageToken) {
//             setPageToken(nextPageToken);
//         }
//     };

//     if (isLoading && videos.length === 0) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     const onHandleFilter = () => {
//         setShowFilter(!showFilter)
//     }

//     const onSelectType = (type: string) => {
//         // console.log('type', type)
//         setPageToken(null)
//         setVideos([])
//         setSelectedType((prev) => {
//             console.log('p', prev, 't', type, prev === type)
//             return (prev === type ? 'all' : type)
//         });
//     };

//     console.log('sss', selectedType)
//     return (
//         <Container sx={{ py: 4 }}>
//             <Filter pageInfo={pageInfo} sort={{ sortOrder, setSortOrder }} onOpenFilter={onHandleFilter} />
//             <VideoList videos={sortedVideos} />
//             {data?.nextPageToken && (
//                 <Box display="flex" justifyContent="center" mt={4}>
//                     <Button
//                         variant="contained"
//                         size="large"
//                         onClick={loadMore}
//                         disabled={isFetching}
//                     >
//                         {isFetching ? "Loading..." : "Load More"}
//                     </Button>
//                 </Box>
//             )}
//             <BootstrapDialog
//                 onClose={onHandleFilter}
//                 aria-labelledby="customized-dialog-title"
//                 open={showFilter}
//             >
//                 <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//                     Filter
//                 </DialogTitle>
//                 <IconButton
//                     aria-label="close"
//                     onClick={onHandleFilter}
//                     sx={(theme) => ({
//                         position: 'absolute',
//                         right: 8,
//                         top: 8,
//                         color: theme.palette.grey[500],
//                     })}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//                 <DialogContent dividers>
//                     <Typography sx={{
//                         mb: 2
//                     }}>VIDEO TYPE</Typography>
//                     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                         {/* {typeList.map(item => (
//                             <Chip key={item.type} label={`${item.type} · ${item.count}`} sx={{ textTransform: 'capitalize' }} />
//                         ))} */}
//                         {typeList
//                             // .filter(item => selectedType === "all" || item.type === selectedType)
//                             .map(item => (
//                                 <Chip
//                                     key={item.type}
//                                     label={`${item.type} · ${item.count}`}
//                                     onClick={() => onSelectType(item.type)}
//                                     sx={{
//                                         cursor: "pointer",
//                                         mr: 1,
//                                         mb: 1,
//                                         transition: "0.2s",

//                                         // warna chip saat active
//                                         backgroundColor:
//                                             selectedType === item.type
//                                                 ? "primary.main"
//                                                 : "default",

//                                         color:
//                                             selectedType === item.type
//                                                 ? "black"
//                                                 : "inherit",
//                                         textTransform: 'capitalize'
//                                     }}
//                                 />
//                             ))}

//                     </Box>
//                 </DialogContent>
//             </BootstrapDialog>
//         </Container>
//     )
// }
import { Box, Button, Chip, CircularProgress, Container, IconButton } from '@mui/material';
import React, { useState, useEffect, useMemo } from 'react';
import { PageInfoTypes, SortTypes, Video } from '../../types/Movie';
import { fetchVideos } from '../../api/imdb';
import VideoList from './VideoList';
import Filter from '../Filter';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2) },
    '& .MuiDialogActions-root': { padding: theme.spacing(1) },
    '& .MuiPaper-root': { width: '80%', maxWidth: 'none' },
}));

export default function DataGrid({ id }: { id: string }) {
    const [videos, setVideos] = useState<Video[]>([]);
    const [pageToken, setPageToken] = useState<string | null>(null);
    const [nextPageToken, setNextPageToken] = useState<string | null>(null);
    const [pageInfo, setPageInfo] = useState<PageInfoTypes>({ from: 0, to: 0, total: 0 });
    const [sortOrder, setSortOrder] = useState<SortTypes['sortOrder']>("desc");
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<string>('all');
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [isFiltering, setIsFiltering] = useState<boolean>(false);
    // Filter yang dikirim ke API
    const filterType = selectedType === 'all' ? undefined : selectedType;

    // Sorted videos
    const sortedVideos = useMemo(() => {
        const sorted = [...videos];
        sorted.sort((a, b) => {
            const durA = a.runtimeSeconds ?? 0;
            const durB = b.runtimeSeconds ?? 0;
            return sortOrder === "asc" ? durA - durB : durB - durA;
        });
        return sorted;
    }, [videos, sortOrder]);

    // Hitung jumlah per tipe
    const typeCounts = useMemo(() => {
        return videos.reduce((acc, video) => {
            acc[video.type] = (acc[video.type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [videos]);

    const typeList = useMemo(() =>
        Object.entries(typeCounts)
            .map(([type, count]) => ({ type, count }))
            .sort((a, b) => b.count - a.count),
        [typeCounts]
    );

    // Fungsi fetch utama
    const loadVideos = async (isLoadMore = false) => {
        if (!isLoadMore && !loadingMore) {
            setLoading(true);
            setIsFiltering(true); // Dialog tetap buka
        } else {
            setLoadingMore(true);
        }

        try {
            const data = await fetchVideos(id, filterType, isLoadMore ? pageToken || undefined : undefined);

            setVideos(prev => {
                const newList = isLoadMore ? [...prev, ...(data.videos || [])] : (data.videos || []);

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
            console.error("Failed to fetch videos:", err);
        } finally {
            setLoading(false);
            setLoadingMore(false);
            setIsFiltering(false);
        }
    };

    // Fetch saat filter / id berubah
    useEffect(() => {
        setVideos([]);
        setPageToken(null);
        setNextPageToken(null);
        loadVideos(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, filterType]);

    // Load more
    const loadMore = () => {
        if (nextPageToken && !loadingMore) {
            loadVideos(true);
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

    return (
        <Container sx={{ py: 4 }}>
            <Filter pageInfo={pageInfo} sort={{ sortOrder, setSortOrder }} onOpenFilter={onHandleFilter} />

            <VideoList videos={sortedVideos} />

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
                    <Typography sx={{ mb: 2, fontWeight: 'bold' }}>VIDEO TYPE</Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {isFiltering ? <CircularProgress /> : typeList.map(item => (
                            <Chip
                                key={item.type}
                                label={`${item.type} · ${item.count}`}
                                onClick={() => { onSelectType(item.type) }}
                                color={selectedType === item.type ? "primary" : "default"}
                                sx={{ textTransform: 'capitalize', cursor: 'pointer' }}
                            />
                        ))}
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </Container>
    );
}