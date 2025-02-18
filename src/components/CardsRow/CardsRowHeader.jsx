import { Box, IconButton, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const CardsRowHeader = ({ title, toggleVisibleCard }) => {
    return (
        <Box
            component="div"
            sx={{
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Typography
                component="h2"
                variant="h6"
                textAlign="center"
                flexGrow="1"
            >
                {title}
            </Typography>
            <IconButton
                color="primary"
                aria-label="delete"
                size="medium"
                onClick={toggleVisibleCard}
            >
                <AddCircleIcon size="inherit" />
            </IconButton>
        </Box>
    );
};

export default CardsRowHeader;
