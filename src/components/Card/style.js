import { Box, styled } from '@mui/material';

export const StyledCard = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 'fit-content',
    padding: '5px 10px',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'all .3s ease',
    '&:hover': {
        backgroundColor: theme.palette.secondary.hover,
    },
    '&:active': {
        backgroundColor: theme.palette.secondary.main,
    },
    '&:hover .card-buttons': {
        opacity: '1',
        pointerEvents: 'all',
    },
}));

export const StyledButtonsPanel = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '0',
    right: '0',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexDirection: 'column',
    transition: 'all .3s ease',
    opacity: '0',
    pointerEvents: 'none',
    backgroundColor: theme.palette.primary.extraLight,
    backdropFilter: 'blur(1px)',
}));

export const TextAreaStyled = styled(Box)(({ theme }) => ({
    width: '100%',
    border: 'none',
    resize: 'none',
    color: theme.palette.text.primary,
    fontSize: '15px',
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    lineHeight: '1.5',
    backgroundColor: 'transparent',
    height: '100%',
    '&:focus-visible': {
        outline: 'none',
    },
}));
