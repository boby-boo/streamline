import { ListItem, styled, Typography } from '@mui/material';

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 450,
    height: 300,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
};

export const StyledListItem = styled(ListItem)(({ theme }) => ({
    width: 300,
    paddingBottom: '15px',
    display: 'flex',
    alignItems: 'flex-start',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        transition: 'all .3s ease',
    },
}));
