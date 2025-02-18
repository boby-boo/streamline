import { Box, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const CreateOrUpdateButton = ({ updateCard, isEditing }) => {
    return (
        <Box>
            <IconButton
                color="default"
                size="small"
                onClick={updateCard}
                aria-label="change item"
            >
                {isEditing ? (
                    <SaveIcon size="inherit" />
                ) : (
                    <EditIcon size="inherit" />
                )}
            </IconButton>
        </Box>
    );
};

export default CreateOrUpdateButton;
