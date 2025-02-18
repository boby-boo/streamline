import { webinarDocuments } from './documentsName';

export const getCurrentDocumentName = currentDocumentName => {
    return Object.keys(webinarDocuments).find(
        key => webinarDocuments[key] === currentDocumentName,
    );
};
