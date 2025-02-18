import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteButton = ({ removeCard, id, currentDocumentName }) => {
    return (
        <IconButton
            onClick={() => removeCard(id, currentDocumentName)}
            color="error"
            aria-label="delete"
            size="small"
        >
            <DeleteIcon fontSize="small" />
        </IconButton>
    );
};

export default DeleteButton;
