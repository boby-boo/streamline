import { CreateOrUpdateButton, DeleteButton } from '../Buttons';
import { StyledCard, StyledTextarea, StyledTextareaPanel } from './style.js';

const CardTextArea = ({
    createNewCard,
    removeCard,
    newCardRef,
    text,
    toggleValue,
    currentDocumentName,
    newTemplateCard,
}) => {
    return (
        <StyledCard component="div">
            <StyledTextarea
                component="textarea"
                ref={newCardRef}
                value={text}
                onChange={toggleValue}
            />
            <StyledTextareaPanel component="div">
                <CreateOrUpdateButton
                    updateCard={createNewCard}
                    isEditing={text.length > 1}
                />
                <DeleteButton
                    removeCard={() => removeCard(newTemplateCard.id)}
                    currentDocumentName={currentDocumentName}
                    id={newTemplateCard.id}
                />
            </StyledTextareaPanel>
        </StyledCard>
    );
};

export default CardTextArea;
