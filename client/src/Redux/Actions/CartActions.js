import { setCart } from '../Slices/CartSlice';

export const setCurrentUserCart = (dispatch, cart) => {
    try {
        dispatch(setCart({
            cart: cart.cart,
            totalPrice: cart.totalPrice
        }));
    } catch (error) {
        console.log(error.message);
    }
};