import { useEffect } from 'react';

import { Box, CssBaseline } from '@mui/material';
import Header from '../Header/Header';
import NotationsPanel from '../NotationsPanel/NotationsPanel';
import { ThemeProviderCustom } from '../ThemeProviderCustom/ThemeProviderCustom.jsx';
import Notification from '../Notification/Notification.jsx';
import CardsRow from '../CardsRow/CardsRow.jsx';
import copyCard from './copyCard.js';

const App = () => {
    useEffect(() => copyCard(), []);

    return (
        <ThemeProviderCustom>
            <CssBaseline />
            <NotationsPanel />
            <Box
                component="div"
                sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: 'secondary.main',
                }}
            >
                <Header />
                <CardsRow />
            </Box>
            <Notification />
        </ThemeProviderCustom>
    );
};

export default App;
