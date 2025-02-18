import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import CardsList from '../CardsRow/CardsList.jsx';
import { getWebinarTemplates } from '../../features/webinar/webinarThunks';
import { Box, CssBaseline } from '@mui/material';
import Header from '../Header/Header';
import NotationsPanel from '../NotationsPanel/NotationsPanel';
import { ThemeProviderCustom } from '../ThemeProviderCustom/ThemeProviderCustom.jsx';
import Notification from '../Notification/Notification.jsx';
import CardsRow from '../CardsRow/CardsRow.jsx';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        document
            .querySelector('[data-cards-row]')
            .addEventListener('click', e => {
                const target = e.target;
                const parentElement = target.closest('[data-card]');
                if (parentElement) {
                    navigator.clipboard.writeText(parentElement.textContent);
                    document
                        .querySelector('[data-notification]')
                        .classList.add('visible');
                    setTimeout(() => {
                        document
                            .querySelector('[data-notification]')
                            .classList.remove('visible');
                    }, 1000);
                }
            });
        document.body.addEventListener('click', e => {
            const target = e.target;
            const parentElement = target.closest('[data-notation-card]');
            if (parentElement) {
                navigator.clipboard.writeText(parentElement.textContent);
                document
                    .querySelector('[data-notification]')
                    .classList.add('visible');
                setTimeout(() => {
                    document
                        .querySelector('[data-notification]')
                        .classList.remove('visible');
                }, 1000);
            }
        });
    }, []);

    useEffect(() => {
        dispatch(getWebinarTemplates());
    }, [dispatch]);

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
