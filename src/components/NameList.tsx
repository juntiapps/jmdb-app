import { ListItem, Typography, Link, Box } from '@mui/material';
import React from 'react'
import { MovieDirector, MovieWriter, Name } from '../types/Movie';
import { ChevronRight } from '@mui/icons-material';

export default function _NameList({ names, label, action = false }: { names?: MovieDirector[] | MovieWriter[], label: string, action?: boolean }) {
    let addedProps = {}
    const Main = () => (
        <>
            <Typography marginRight={2} fontWeight={'bold'}>{label}{(names?.length ?? 0) > 1 && "s"}</Typography>
            {names?.map((item, index, arr) => {
                const isLast = index === arr.length - 1;

                return (
                    <React.Fragment key={item.id ?? index}>
                        <Link
                            href={`https://imdb.com/name/${item.id}`}
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
        </>)
    if (action) {
        addedProps = {
            justifyContent: 'space-between', // ✅ kiri-kanan rata
            alignItems: 'center',
        }
    }
    return (
        <ListItem sx={{ paddingX: 0, borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: 'gray', ...addedProps }}>
            {action ? (<>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Main />
                </Box>
                <ChevronRight fontSize="medium" color="action" />
            </>
            ) : (<Main />)}

        </ListItem>

    )
}
