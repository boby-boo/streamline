import { styled, Typography } from '@mui/material';

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

export const StyledTextarea = styled(Typography)(({ theme }) => ({
    width: '100%',
    height: '50%',
    borderRadius: '10px',
    padding: '12px',
    border: `1px solid ${theme.palette.primary.main}`,
    resize: 'none',
    outline: 'none',
    '&:focus-visible': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 5px ${theme.palette.primary.main}`,
    },
}));
