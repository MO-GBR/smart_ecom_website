import { addToCart, removeFromCart } from '../Slices/CartSlice';

export const addItemToCart = (dispatch, product) => {
    try {
        dispatch(addToCart(product));
    } catch (error) {
        console.log(error.message);
    }
};

export const removeItemToCart = (dispatch, product) => {
    try {
        dispatch(removeFromCart(product));
    } catch (error) {
        console.log(error.message);
    }
}