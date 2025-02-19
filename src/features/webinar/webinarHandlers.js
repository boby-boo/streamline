import { getCurrentDocumentName } from '../../utils/getCurrentDocumentName';

export const handlePostTemplateCard = (state, action) => {
    const { id, title, currentDocumentName } = action.payload;
    const newTemplateCard = {
        id,
        title,
    };
    const currentDocumentId = getCurrentDocumentName(currentDocumentName);

    const targetTemplate = state.templates.find(
        template => template.id === currentDocumentId,
    );

    if (targetTemplate) {
        targetTemplate.template.unshift(newTemplateCard);
    }
};

export const handleRemoveTemplateCard = (state, action) => {
    const { id, currentDocumentName } = action.payload;
    const currentDocumentId = getCurrentDocumentName(currentDocumentName);
    const targetTemplate = state.templates.find(
        template => template.id === currentDocumentId,
    );

    if (targetTemplate) {
        targetTemplate.template = targetTemplate.template.filter(
            item => item.id !== id,
        );
    }
};

export const handleUpdateTemplateCard = (state, action) => {
    const { id, updateText, currentDocumentName } = action.payload;
    const currentDocumentId = getCurrentDocumentName(currentDocumentName);
    const targetTemplate = state.templates.find(
        template => template.id === currentDocumentId,
    );

    if (targetTemplate) {
        targetTemplate.template = targetTemplate.template.map(item =>
            item.id === id ? { ...item, title: updateText } : item,
        );
    }
};

export const handleDraggableTemplateCard = (state, action) => {
    const { cards, currentDocumentName } = action.payload;

    const currentDocumentId = getCurrentDocumentName(currentDocumentName);
    const targetTemplate = state.templates.find(
        template => template.id === currentDocumentId,
    );
    targetTemplate.template = cards;

    // if (targetTemplate) {
    //     targetTemplate.template.unshift(newTemplateCard);
    // }
};
