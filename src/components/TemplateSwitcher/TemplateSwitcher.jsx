import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { queryTemplate } from '../../features/webinar/webinarSlice';

const template = {
    0: {
        name: 'Вебінар',
        templateName: 'webinar',
    },
    1: {
        name: 'Конференція',
        templateName: 'conference',
    },
};

const templateName = {
    webinar: {
        name: 'Вебінар',
        templateName: 'webinar',
    },
    conference: {
        name: 'Конференція',
        templateName: 'conference',
    },
};
const TemplateSwitcher = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const nameTemplates = useSelector(state => state.webinar.templateName);
    const [chooseTemplate, setChooseTemplate] = useState(
        nameTemplates === 'webinar'
            ? templateName.webinar.name
            : templateName.conference.name,
    );
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleQueryTemplate = event => {
        const templateQuery = template[event.target.value];
        setChooseTemplate(templateQuery.name);
        dispatch(queryTemplate(templateQuery.templateName));
        localStorage.setItem('template', templateQuery.templateName);
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
