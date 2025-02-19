import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { webinarDocuments } from '../../utils/documentsName';
import { useEffect, useRef, useState } from 'react';
import Card from '../Card/Card';
import {
    draggableUpdateTemplates,
    postTemplateItem,
} from '../../features/webinar/webinarThunks';

import CardsRowHeader from './CardsRowHeader';
import CardTextArea from './CardTextArea';
import { StyledCardsList, StyledCardsSublist } from './style';

import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const CardsList = ({ title, id, template }) => {
    const [text, setText] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [cards, setCards] = useState(template);
    const [cardIsEdit, setCardIsEdit] = useState(false);
    const [newTemplateCard, setNewTemplateCard] = useState({
        currentDocumentName: null,
        id: null,
        title: null,
    });

    const [isVisible, setIsVisible] = useState(false);
    const newCardRef = useRef(null);
    const dispatch = useDispatch();
    const currentDocumentName = webinarDocuments[id];

    useEffect(() => {
        setCards(template);
    }, [template]);

    useEffect(() => {
        dispatch(
            draggableUpdateTemplates({
                cards,
                currentDocumentName,
            }),
        );
    }, [cards, dispatch, currentDocumentName]);

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: { distance: cardIsEdit ? Infinity : 0 },
        }),
        useSensor(TouchSensor, {
            activationConstraint: { distance: cardIsEdit ? Infinity : 0 },
        }),
    );

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

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = event => {
        setIsDragging(false);

        const { active, over } = event;

        if (active.id !== over.id) {
            setCards(cards => {
                const oldIndex = cards.findIndex(item => item.id === active.id);
                const newIndex = cards.findIndex(item => item.id === over.id);

                return arrayMove(cards, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext
            autoScroll={false}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={cards}
                strategy={verticalListSortingStrategy}
            >
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
                        {cards.map(item => (
                            <Card
                                {...item}
                                currentDocumentName={currentDocumentName}
                                key={item.id}
                                someoneIsDragging={isDragging}
                                setCardIsEdit={setCardIsEdit}
                            />
                        ))}
                    </StyledCardsSublist>
                </StyledCardsList>
            </SortableContext>
        </DndContext>
    );
};

export default CardsList;
