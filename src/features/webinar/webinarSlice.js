import { createSlice } from '@reduxjs/toolkit';

import {
    draggableUpdateTemplates,
    getWebinarTemplates,
    postTemplateItem,
    removeTemplateItem,
    updateTemplateItem,
} from './webinarThunks';
import {
    handleDraggableTemplateCard,
    handlePostTemplateCard,
    handleRemoveTemplateCard,
    handleUpdateTemplateCard,
} from './webinarHandlers';

const filteredTemplates = {
    id: null,
    template: null,
    title: 'Результат пошуку',
};

const initialState = {
    templates: [],
    templateName: localStorage.getItem('template') || 'webinar',
    isFiltered: false,
    filteredTemplates,
    filteredTemplatesAreEmpty: true,
    loading: false,
    error: '',
};

const webinarSlice = createSlice({
    name: 'webinar',
    initialState,
    reducers: {
        filterTemplate: (state, action) => {
            const { data, isFiltered, filteredTemplatesAreEmpty } =
                action.payload;
            state.filteredTemplates = data;
            state.isFiltered = isFiltered;
            state.filteredTemplatesAreEmpty = filteredTemplatesAreEmpty;
        },
        queryTemplate: (state, action) => {
            state.templateName = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getWebinarTemplates.pending, state => {
            state.loading = true;
            state.templates = [];
        });
        builder.addCase(getWebinarTemplates.fulfilled, (state, action) => {
            state.loading = false;
            state.templates = action.payload;
        });
        builder.addCase(getWebinarTemplates.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(postTemplateItem.pending, state => {
            // state.loading = true;
        });
        builder.addCase(postTemplateItem.fulfilled, (state, action) => {
            state.loading = false;
            handlePostTemplateCard(state, action);
        });
        builder.addCase(postTemplateItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(removeTemplateItem.pending, state => {
            // state.loading = true;
        });
        builder.addCase(removeTemplateItem.fulfilled, (state, action) => {
            state.loading = false;
            handleRemoveTemplateCard(state, action);
        });
        builder.addCase(removeTemplateItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateTemplateItem.pending, state => {
            // state.loading = true;
        });
        builder.addCase(updateTemplateItem.fulfilled, (state, action) => {
            state.loading = false;
            handleUpdateTemplateCard(state, action);
        });
        builder.addCase(updateTemplateItem.rejected, action => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(draggableUpdateTemplates.pending, action => {});
        builder.addCase(draggableUpdateTemplates.fulfilled, (state, action) => {
            handleDraggableTemplateCard(state, action);
        });
    },
});

export const { filterTemplate, queryTemplate } = webinarSlice.actions;
export default webinarSlice.reducer;
