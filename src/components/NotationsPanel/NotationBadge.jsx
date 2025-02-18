import Badge from '@mui/material/Badge';
import TextsmsIcon from '@mui/icons-material/Textsms';
import { IconButton } from '@mui/material';
import Fab from '@mui/material/Fab';

const NotationBadge = ({ notationQty, toggleDrawer }) => {
    return (
        <Fab
            onClick={toggleDrawer(true)}
            color="default"
            size="medium"
            sx={{ top: '23px' }}
            className="notation-badge"
            aria-label="show notations"
            disabled={notationQty === 0}
        >
            <Badge badgeContent={notationQty} color="primary">
                <TextsmsIcon />
            </Badge>
        </Fab>
    );
};

export default NotationBadge;
