import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../../firebase';
import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from 'firebase/firestore';

export const postNotation = createAsyncThunk(
    'notations/postNotation',
    async (notation, { rejectWithValue }) => {
        try {
            const docRef = doc(db, 'notations', 'notations');
            await updateDoc(docRef, {
                template: arrayUnion(notation),
            });
            return notation;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);

export const getNotations = createAsyncThunk(
    'notations/getNotations',
    async () => {
        const snapshot = await getDocs(collection(db, 'notations'));
        const notations = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return notations[0].template;
    },
);

export const removeNotation = createAsyncThunk(
    'notations/removeNotation',
    async (id, { rejectWithValue }) => {
        try {
            const docRef = doc(db, 'notations', 'notations');
            console.log('docRef', docRef);
            const docSnap = await getDoc(docRef);

            console.log('docSnap: ', docSnap);
            if (!docSnap.exists()) {
                console.log('Error');
                throw new Error('Документ не знайдено!');
            }

            const data = docSnap.data();

            const updatedTemplate = data.template.filter(
                item => item.id !== id,
            );

            await updateDoc(docRef, {
                template: updatedTemplate,
            });

            return updatedTemplate;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);

const initialState = {
    notations: [],
    isEmpty: true,
    isLoading: false,
    error: '',
};

const notationsSlice = createSlice({
    name: 'temporaryTemplates',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getNotations.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(getNotations.fulfilled, (state, action) => {
            state.isLoading = false;
            state.notations = action.payload;
        });
        builder.addCase(getNotations.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(postNotation.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(postNotation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.notations.push(action.payload);
        });
        builder.addCase(postNotation.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(removeNotation.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(removeNotation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.notations = action.payload;
        });
        builder.addCase(removeNotation.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export default notationsSlice.reducer;
