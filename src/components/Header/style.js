import { AppBar, styled } from '@mui/material';

export const StyledCardsRow = styled(AppBar)(({ theme }) => ({
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    gap: '50px',
    flexDirection: 'row',
    padding: '20px',
    zIndex: '1',
}));
