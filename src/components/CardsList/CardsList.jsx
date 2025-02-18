import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { webinarDocuments } from '../../utils/documentsName';
import { useEffect, useRef, useState } from 'react';
import Card from '../Card/Card';
import { postTemplateItem } from '../../features/webinar/webinarThunks';

import Box from '@mui/material/Box';
import { Container, IconButton, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardTextArea from './CardTextArea';

const CardsList = ({ title, id, template }) => {
    const [text, setText] = useState('');
    const [newTemplateCard, setNewTemplateCard] = useState({
        currentDocumentName: null,
        id: null,
        title: null,
    });
    const [isVisible, setIsVisible] = useState(false);
    const newCardRef = useRef(null);
    const dispatch = useDispatch();
    const currentDocumentName = webinarDocuments[id];

    const createNewCard = () => {
        if (text.length < 1) {
            toggleVisibleCard(false);
            return;
        }

        const newCard = {
            currentDocumentName,
            id: uuidv4(),
            title: text,
        };

        dispatch(postTemplateItem(newCard));
        setText('');
        toggleVisibleCard(false);
        setNewTemplateCard(newCard);
    };

    const toggleVisibleCard = () => {
        console.log('toggleVisibleCard');
        setIsVisible(!isVisible);
    };

    const removeCard = () => {
        setNewTemplateCard({
            currentDocumentName: null,
            id: null,
            title: null,
        });

        setIsVisible(false);
        setText('');
    };

    const toggleValue = e => {
        setText(e.target.value);
    };

    useEffect(() => {
        if (newCardRef.current) {
            newCardRef.current.focus();
        }
    }, [isVisible]);

    const items = template.map(item => (
        <Card
            {...item}
            currentDocumentName={currentDocumentName}
            key={item.id}
        />
    ));

    return (
        <Container component="li" color="primary">
            <Box
                key={id}
                className="cards-list"
                sx={{ bgcolor: 'primary.secondary' }}
            >
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

                {isVisible && (
                    <CardTextArea
                        createNewCard={createNewCard}
                        removeCard={removeCard}
                        newCardRef={newCardRef}
                        text={text}
                        toggleValue={toggleValue}
                        currentDocumentName={currentDocumentName}
                        newTemplateCard={newTemplateCard}
                    />
                )}
                <Box component="ul" className="cards-sublist" padding={1.3}>
                    {items}
                </Box>
            </Box>
        </Container>
    );
};

export default CardsList;
