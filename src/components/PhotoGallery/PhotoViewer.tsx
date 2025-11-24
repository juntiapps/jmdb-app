import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Images } from '../../types/Movie';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ photo, open, setOpen }: { photo: Images, open: boolean, setOpen: (open: boolean) => void, }) {
    //   const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
        navigate(window.location.pathname, { replace: true });
    };

    const isPortrait = photo.width < photo.height;
    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                slots={{
                    transition: Transition,
                }}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', bgcolor: 'background.default' }}>
                    <img src={photo.url} style={{ width: isPortrait ? 'auto' : '100%', height: isPortrait ? '100%' : 'auto' }} />
                </Box>
            </Dialog>
        </React.Fragment>
    );
}