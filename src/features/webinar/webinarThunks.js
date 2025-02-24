import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../firebase';
import {
    arrayUnion,
    collection,
    disableNetwork,
    doc,
    enableNetwork,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
} from 'firebase/firestore';

const defineQueryTemplate = async api => {
    const state = await api.getState();
    return state.webinar.templateName;
};

export const getWebinarTemplates = createAsyncThunk(
    'webinar/getWebinarTemplates',
    async (_, thunkAPI) => {
        const templateQuery = await defineQueryTemplate(thunkAPI);

        const webinarCollection = query(
            collection(db, templateQuery),
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
    async (postElementData, thunkAPI) => {
        const { title, id, currentDocumentName } = postElementData;
        const templateQuery = await defineQueryTemplate(thunkAPI);
        const newTemplateItem = {
            title,
            id,
        };

        try {
            const docRef = doc(db, templateQuery, currentDocumentName);
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
            return thunkAPI.rejectWithValue(e.message);
        }
    },
);

export const draggableUpdateTemplates = createAsyncThunk(
    'webinar/draggableUpdateTemplates',
    async (cardsData, thunkAPI) => {
        const templateQuery = await defineQueryTemplate(thunkAPI);
        const { cards, currentDocumentName } = cardsData;
        try {
            const docRef = doc(db, templateQuery, currentDocumentName);
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
            return thunkAPI.rejectWithValue(e.message);
        }
    },
);

export const removeTemplateItem = createAsyncThunk(
    'webinar/removeTemplateItem',
    async (templateToRemove, thunkAPI) => {
        const { id, currentDocumentName } = templateToRemove;
        const templateQuery = await defineQueryTemplate(thunkAPI);
        try {
            const docRef = doc(db, templateQuery, currentDocumentName);
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
            return thunkAPI.rejectWithValue(e.message);
        }
    },
);

export const updateTemplateItem = createAsyncThunk(
    'webinar/updateTemplateItem',
    async (updateData, thunkAPI) => {
        const { id, updateText, currentDocumentName } = updateData;
        const templateQuery = await defineQueryTemplate(thunkAPI);
        try {
            const docRef = doc(db, templateQuery, currentDocumentName);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                throw new Error('Документ не знайдено!');
            }

            const data = docSnap.data();

            const updatedTemplates = data.template.map(item =>
                item.id === id ? { ...item, title: updateText } : item,
            );

            await updateDoc(docRef, {
                template: updatedTemplates,
            });

            return updateData;
        } catch (e) {
            console.error('Помилка оновлення:', e);
            return thunkAPI.rejectWithValue(e.message);
        }
    },
);
