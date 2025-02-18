import { Box, styled } from '@mui/material';

export const StyledCard = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '100px',
    overflow: 'hidden',
    margin: '0 10px',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '15px',
    // cursor: 'pointer',
}));

export const StyledTextareaPanel = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '0',
    right: '0',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.extraLight,
    backdropFilter: 'blur(1px)',
}));

export const StyledTextarea = styled(Box)(({ theme }) => ({
    padding: '5px 10px',
    width: '100%',
    height: '100%',
    resize: 'none',
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    lineHeight: '1.5',
    borderRadius: '15px',
}));
