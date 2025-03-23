import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fetching: false,
    user: null,
    message: '',
    error: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        start: (state, action) => {
            state.fetching = true;
        },
        authProcess: (state, action) => {
            state.user = action.payload.user;
            state.message = action.payload.msg;
            state.error = action.payload.err;
        },
        end: (state, action) => {
            state.fetching = false;
        },
    }
});

export const { start, authProcess, end } = userSlice.actions;

export const selectUser = state => state.user;

export default userSlice.reducer;