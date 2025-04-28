import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    totalPrice: 0,
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload.cart;
            state.totalPrice = action.payload.totalPrice;
        },

        addItemToCart: (state, action) => {
            const { productId, color, price } = action.payload;
            const existingItem = state.cart?.find(
                (item) => item.productId === productId && item.color.code === color.code
            );
      
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart?.push({ ...action.payload });
            };

            state.totalPrice = price;
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart?.filter(
                (item) => item.productId !== action.payload
            );
        },

        clearCart: (state) => {
            state.cart = [];
            state.totalPrice = 0;
        },

        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        }
    }
});

export const { setCart, addItemToCart, removeFromCart, clearCart, setTotalPrice } = CartSlice.actions;

export const selectCart = state => state.cart;

export default CartSlice.reducer;