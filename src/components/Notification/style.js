import { styled, Alert } from '@mui/material';

export const StyledAlert = styled(Alert)(({ theme }) => ({
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    zIndex: 111,
    width: '20vw',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'all .3s ease',
    '&.visible': {
        opacity: 1,
        pointerEvents: 'all',
    },
}));
