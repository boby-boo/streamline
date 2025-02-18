import { configureStore } from '@reduxjs/toolkit';
import webinarReducer from '../features/webinar/webinarSlice';
import notationsReducer from '../features/notations/notationsSlice';

const store = configureStore({
    reducer: {
        webinar: webinarReducer,
        notations: notationsReducer,
    },
});

export default store;
