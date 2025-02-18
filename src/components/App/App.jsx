import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import CardsList from '../CardsList/CardsList';
import { getWebinarTemplates } from '../../features/webinar/webinarThunks';
import { Box, CssBaseline } from '@mui/material';
import Header from '../Header/Header';
import NotationsPanel from '../NotationsPanel/NotationsPanel';
import { ThemeProviderCustom } from '../ThemeProviderCustom/ThemeProviderCustom.jsx';
import Notification from '../Notification/Notification.jsx';

const App = () => {
    const isFiltered = useSelector(state => state.webinar.isFiltered);
    const filteredTemplatesAreEmpty = useSelector(
        state => state.webinar.filteredTemplatesAreEmpty,
    );
    const templates = useSelector(state =>
        isFiltered ? state.webinar.filteredTemplates : state.webinar.templates,
    );

    const isLoading = useSelector(state => state.webinar.loading);
    const error = useSelector(state => state.webinar.error);
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
            <Box
                component="div"
                sx={{ bgcolor: 'primary.secondary', minWidth: '100vw' }}
            >
                <Header />

                <NotationsPanel />
                <Box component="ul" className="cards-row" data-cards-row>
                    {isLoading && <h2>Loading</h2>}
                    {isFiltered && filteredTemplatesAreEmpty && (
                        <h2>Cards not found</h2>
                    )}

                    {templates[0]?.template.length !== 0 &&
                        templates.map(list => (
                            <CardsList {...list} key={list.id} />
                        ))}
                </Box>
            </Box>
            <Notification />
        </ThemeProviderCustom>
    );
};

export default App;
