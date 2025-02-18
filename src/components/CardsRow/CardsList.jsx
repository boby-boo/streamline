import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { webinarDocuments } from '../../utils/documentsName';
import { useEffect, useRef, useState } from 'react';
import Card from '../Card/Card';
import { postTemplateItem } from '../../features/webinar/webinarThunks';

import { Container } from '@mui/material';
import CardsRowHeader from './CardsRowHeader';
import CardTextArea from './CardTextArea';
import { StyledCardsList, StyledCardsSublist } from './style';

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

    return (
        <StyledCardsList
            key={id}
            component="li"
            className="cards-list"
            sx={{ bgcolor: 'primary.secondary' }}
        >
            <CardsRowHeader
                title={title}
                toggleVisibleCard={toggleVisibleCard}
            />
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
            <StyledCardsSublist
                component="ul"
                className="cards-sublist"
                padding={1.3}
            >
                {template.map(item => (
                    <Card
                        {...item}
                        currentDocumentName={currentDocumentName}
                        key={item.id}
                    />
                ))}
            </StyledCardsSublist>
        </StyledCardsList>
    );
};

export default CardsList;
