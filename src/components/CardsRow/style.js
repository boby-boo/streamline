import { Box, styled } from '@mui/material';

export const StyledCardsRow = styled(Box)(({ theme }) => ({
    paddingTop: '120px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '1.5vw',
    '& .css-5c1adp-MuiContainer-root': {
        width: '18%',
        padding: 0,
        margin: 0,
    },
}));

export const StyledCardsList = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    // width: 300px;
    gap: '10px',
    borderRadius: '20px',
    padding: '15px 0 30px',
    wordWrap: 'break-word',
}));

export const StyledCardsSublist = styled(Box)(({ theme }) => ({
    height: '65vh',
    width: '100%',
    paddingBottom: '4vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    overflowY: 'scroll',
}));

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
