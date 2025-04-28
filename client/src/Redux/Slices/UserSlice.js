import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fetching: false,
    currentUser: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        start: (state, action) => {
            state.fetching = true;
        },
        authProcess: (state, action) => {
            state.currentUser = action.payload.user;
        },
        end: (state, action) => {
            state.fetching = false;
        },
    }
});

export const { start, authProcess, end } = userSlice.actions;

export const selectUser = state => state.user;

export default userSlice.reducer;