import { createSlice } from '@reduxjs/toolkit';

// Initial state: multiple objects under one slice
const initialState = {
    config: null
};

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        // Set the entire config at once
        setConfig: (state, action) => {
            state.config = action.payload
        },
    },
});

export const {
    setConfig,
} = configSlice.actions;

export default configSlice.reducer;
