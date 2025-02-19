import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
    updateTemplateItem,
    removeTemplateItem,
} from '../../features/webinar/webinarThunks';
import { Typography } from '@mui/material';
import { CreateOrUpdateButton, DeleteButton } from '../Buttons';

import { StyledButtonsPanel, StyledCard, TextAreaStyled } from './style';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Card = ({
    id,
    title,
    currentDocumentName,
    someoneIsDragging,
    setCardIsEdit,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(title);
    const [prevState, setPrevState] = useState(title);
    const [styleCard, setStyleCard] = useState({ height: '0' });
    const dispatch = useDispatch();

    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    const updateCard = e => {
        const targetCard = e.target.closest('.card-template');
        const cardHeight = window
            .getComputedStyle(
                targetCard.querySelector('.card-template-text') || targetCard,
                null,
            )
            .getPropertyValue('height');

        setStyleCard({
            height: cardHeight,
        });

        if (isEditing) {
            setCardIsEdit(false);
            setIsEditing(!isEditing);
        } else {
            setCardIsEdit(true);
            setIsEditing(!isEditing);
            setPrevState(text);
        }

        if (prevState !== text) {
            const updateData = {
                currentDocumentName,
                id,
                updateText: text,
            };
            dispatch(updateTemplateItem(updateData));
            setPrevState(text);
        }
    };

    const removeCard = id => {
        dispatch(removeTemplateItem({ id, currentDocumentName }));
    };

    return (
        <StyledCard
            component="li"
            className="card-template"
            id={id}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => {
                if (someoneIsDragging) {
                    console.log('a card somewhere is being dragged still');
                    return;
                }
                if (isDragging) {
                    console.log('this card is being dragged still');
                    return;
                }
            }}
        >
            {isEditing ? (
                <TextAreaStyled
                    component="textarea"
                    value={text}
                    style={styleCard}
                    onChange={e => setText(e.target.value)}
                    autoFocus
                />
            ) : (
                <Typography
                    data-card
                    className="card-template-text"
                    fontSize="15px"
                    lineHeight="1.5"
                >
                    {text}
                </Typography>
            )}
            <StyledButtonsPanel
                className="card-buttons"
                onMouseDownCapture={e => e.stopPropagation()}
            >
                <CreateOrUpdateButton
                    updateCard={updateCard}
                    isEditing={isEditing}
                />
                <DeleteButton
                    removeCard={removeCard}
                    currentDocumentName={currentDocumentName}
                    id={id}
                />
            </StyledButtonsPanel>
        </StyledCard>
    );
};

export default Card;
