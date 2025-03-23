import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    current: 'Dashboard',
};

const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            switch(action.payload.type) {
                case 'Dashboard':
                    state.current = 'Dashboard';
                    break;
                case 'Products':
                    state.current = 'Products';
                    break;
                case 'Orders':
                    state.current = 'Orders';
                    break;
                case 'Users':
                    state.current = 'Users';
                    break;
                default:
                    state.current = 'Dashboard';
            }
        }
    }
});

export const { setCurrent } = AdminSlice.actions;

export const selectAdmin = state => state.admin;

export default AdminSlice.reducer;