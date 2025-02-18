import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import TemplateSwitcher from '../TemplateSwitcher/TemplateSwitcher';
import SearchInput from '../SearchInput/SearchInput';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useState } from 'react';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { StyledCardsRow } from './style';

const Header = () => {
    const [open, setOpen] = useState(false);
    const handleModal = () => setOpen(!open);

    return (
        <StyledCardsRow
            component="header"
            className="header"
            sx={{ backgroundColor: 'primary.header', alignItems: 'center' }}
        >
            <IconButton onClick={handleModal} size="large">
                <AddCircleIcon fontSize="inherit" />
            </IconButton>
            <TemplateSwitcher />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10%',
                }}
                display="flex"
                justifyContent="center"
                spacing={2}
            >
                <SearchInput />
                <TextField
                    color="inherit"
                    size="small"
                    id="filled-basic"
                    label="Додати нікнейм "
                />
            </Box>
            <ThemeSwitcher />
            {open && <ModalWindow handleModal={handleModal} open={open} />}
        </StyledCardsRow>
    );
};

export default Header;
