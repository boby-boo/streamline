import { useCallback, useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import {
    getNotations,
    removeNotation,
} from '../../features/notations/notationsSlice';
import NotationsList from './NotationsList';
import NotationBadge from './NotationBadge';
import { Box, Divider, Typography } from '@mui/material';

const NotationsPanel = () => {
    const [open, setOpen] = useState(false);
    const notations = useSelector(state => state.notations.notations);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNotations());
    }, []);

    useEffect(() => {
        if (notations.length < 1) setOpen(false);
    }, [notations]);

    const toggleDrawer = newOpen => () => {
        setOpen(newOpen);
    };

    const deleteNotation = id => {
        dispatch(removeNotation(id));
    };

    const notationQty = notations.length;

    return (
        <Box component="div" sx={{ width: 300, padding: '2px' }}>
            <NotationBadge
                notationQty={notationQty}
                toggleDrawer={toggleDrawer}
            />
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Typography
                    component="h2"
                    variant="h6"
                    textTransform="uppercase"
                    textAlign="center"
                    padding={1.2}
                >
                    Збережені Нотатки
                </Typography>
                <Divider />
                <NotationsList
                    notations={notations}
                    deleteNotation={deleteNotation}
                />
            </Drawer>
        </Box>
    );
};

export default NotationsPanel;
