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

const Card = ({ id, title, currentDocumentName }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(title);
    const [prevState, setPrevState] = useState(title);
    const [styleCard, setStyleCard] = useState({ height: '0' });

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
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
            setIsEditing(!isEditing);
        } else {
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
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
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
