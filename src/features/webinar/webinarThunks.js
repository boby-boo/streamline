import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../firebase';
import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
} from 'firebase/firestore';

export const getWebinarTemplates = createAsyncThunk(
    'webinar/getWebinarTemplates',
    async () => {
        const webinarCollection = query(
            collection(db, 'webinar'),
            orderBy('id', 'asc'),
        );

        const webinarSnapshot = await getDocs(webinarCollection);
        const webinarTemplates = webinarSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return webinarTemplates;
    },
);

export const postTemplateItem = createAsyncThunk(
    'webinar/postTemplateItem',
    async (postElementData, { rejectWithValue }) => {
        const { title, id, currentDocumentName } = postElementData;

        const newTemplateItem = {
            title,
            id,
        };

        try {
            const docRef = doc(db, 'webinar', currentDocumentName);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const currentTemplate = docSnap.data().template || [];

                const updatedTemplate = [newTemplateItem, ...currentTemplate];

                await updateDoc(docRef, {
                    template: updatedTemplate,
                });

                return postElementData;
            } else {
                throw new Error('Документ не знайдено');
            }
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);

export const draggableUpdateTemplates = createAsyncThunk(
    'webinar/draggableUpdateTemplates',
    async (cardsData, { rejectWithValue }) => {
        const { cards, currentDocumentName } = cardsData;
        try {
            const docRef = doc(db, 'webinar', currentDocumentName);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const updatedTemplate = [...cards];

                await updateDoc(docRef, {
                    template: updatedTemplate,
                });

                return cardsData;
            } else {
                throw new Error('Документ не знайдено');
            }
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);

export const removeTemplateItem = createAsyncThunk(
    'webinar/removeTemplateItem',
    async (templateToRemove, { rejectWithValue }) => {
        const { id, currentDocumentName } = templateToRemove;
        try {
            const docRef = doc(db, 'webinar', currentDocumentName);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                throw new Error('Документ не знайдено!');
            }

            const data = docSnap.data();

            // Видаляємо елемент з масиву вручну
            const updatedTemplate = data.template.filter(
                item => item.id !== id,
            );

            // Оновлюємо документ з новим масивом
            await updateDoc(docRef, {
                template: updatedTemplate,
            });

            return templateToRemove;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);

export const updateTemplateItem = createAsyncThunk(
    'webinar/updateTemplateItem',
    async (updateData, { rejectWithValue }) => {
        const { id, updateText, currentDocumentName } = updateData;

        try {
            const docRef = doc(db, 'webinar', currentDocumentName);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                throw new Error('Документ не знайдено!');
            }

            const data = docSnap.data();
            // Оновлюємо елемент у масиві вручну
            const updatedTemplates = data.template.map(item =>
                item.id === id ? { ...item, title: updateText } : item,
            );
            // Оновлення документа
            await updateDoc(docRef, {
                template: updatedTemplates,
            });

            console.log('Елемент успішно оновлено!');
            return updateData; // Повертаємо ID видаленого елемента
        } catch (e) {
            console.error('Помилка оновлення:', e);
            return rejectWithValue(e.message);
        }
    },
);
