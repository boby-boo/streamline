import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DeleteButton } from '../Buttons';
import { StyledListItem } from './style';

const NotationsList = ({ notations, deleteNotation }) => {
    return (
        <Box
            role="presentation"
            // onClick={toggleDrawer(false)}
        >
            <List className="notations-class">
                {notations &&
                    notations.map(notation => (
                        <React.Fragment key={notation.id}>
                            <StyledListItem>
                                <ListItemText
                                    primary={notation.title}
                                    data-notation-card
                                />
                                <DeleteButton
                                    removeCard={deleteNotation}
                                    id={notation.id}
                                    currentDocumentName="notations"
                                />
                            </StyledListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
            </List>
        </Box>
    );
};

export default NotationsList;
