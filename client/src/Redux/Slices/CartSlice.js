import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    totalPrice: 0,
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) =>{
            state.cart.push(action.payload);
            state.totalPrice += (action.payload.product.price * action.payload.quantity);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(product => product.product._id !== action.payload.product._id);
            state.totalPrice -= (action.payload.product.price * action.payload.quantity)
        },
        clearCart: (state) => {
            state.cart = [];
            state.totalPrice = 0;
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = CartSlice.actions;

export const selectCart = state => state.cart;

export default CartSlice.reducer;