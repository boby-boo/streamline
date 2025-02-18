import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

const template = {
    0: 'Вебінар',
    1: 'Конференція',
};

const TemplateSwitcher = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [chooseTemplate, setChooseTemplate] = useState('Вебінар');
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleQueryTemplate = event => {
        setChooseTemplate(template[event.target.value]);
        handleClose();
    };

    return (
        <Box sx={{ minWidth: '150px' }}>
            <Button
                color="inherit"
                variant="outlined"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {chooseTemplate}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleQueryTemplate} value="0">
                    Вебінар
                </MenuItem>
                <MenuItem onClick={handleQueryTemplate} value="1">
                    Конференція
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default TemplateSwitcher;
