import { ListItem, Typography, Link, Box, Grid, useMediaQuery, List, ListItemText, ListItemButton } from '@mui/material';
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Movie, MovieDirector, MovieOrigin, MovieWriter, Name } from '../types/Movie';
import { ChevronRight } from '@mui/icons-material';

export default function _NameList(
    { names, label, action = false, linkTemplate, linkAction }:
        { names?: MovieDirector[] | MovieWriter[], label: string, action?: boolean, linkTemplate?: string, linkAction?: string }) {
    let addedProps = {}
    const textRef = useRef<HTMLDivElement>(null);
    const [lineCount, setLineCount] = useState(1);
    useLayoutEffect(() => {
        if (textRef.current) {
            const el = textRef.current;
            const style = window.getComputedStyle(el);

            const lineHeight = parseFloat(style.lineHeight);
            const height = el.getBoundingClientRect().height;

            const lines = Math.round(height / lineHeight);

            setLineCount(lines);
        }
    }, [names]);


    const Main = () => (
        <Grid container spacing={0}>
            <Grid size={lineCount > 1 ? 12 : "auto"}>
                <Typography marginRight={1} fontWeight="bold">
                    {label}{(names?.length ?? 0) > 1 && "s"}
                </Typography>
            </Grid>
            <Grid container>
                <Grid>
                    <Typography component="div" sx={{ display: "inline", whiteSpace: "normal" }} ref={textRef}>
                        {names?.map((item, index, arr) => {
                            const isLast = index === arr.length - 1;


                            return (
                                <React.Fragment key={item.id ?? index}>
                                    <Link
                                        href={label === 'Genre' ? `${linkTemplate}${item.displayName}` : `${linkTemplate}${["Country of origin", "Language"].includes(label) ? '' : '/'}${item.id}`}
                                        underline="hover"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{ textDecoration: "none" }}
                                    >
                                        <Typography
                                            component="span"
                                            color="info.main"
                                            variant="body1"
                                            sx={{ fontWeight: 500 }}
                                        >
                                            {item.displayName}
                                        </Typography>
                                    </Link>

                                    {!isLast && (
                                        <Typography
                                            component="span"
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ mx: 1 }}
                                        >
                                            –
                                        </Typography>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </Typography>
                </Grid>
            </Grid>

        </Grid>
    )
    if (action) {
        addedProps = {
            justifyContent: 'space-between', // ✅ kiri-kanan rata
            alignItems: 'center',
        }
    }

    return (
        <ListItem
            sx={{
                paddingX: 0,
                borderBottomStyle: "solid",
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                ...addedProps
            }}
        >
            {action ? (
                <Box
                    component="button"
                    onClick={() => (window.open(linkAction, '_blank'))}
                    style={{
                        all: "unset",        // hilangkan style button
                        cursor: "pointer",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            flex: 1,
                        }}
                    >
                        <Main />
                    </Box>

                    <ChevronRight fontSize="medium" color="action" />
                </Box>
            ) : (
                <Main />
            )}
        </ListItem>
    )
}
