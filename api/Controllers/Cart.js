import Cart from "../Mongo/Models/Cart.js";
import { ActionResponse, ErrorResponse } from "../Utils/HandleResponse.js";

export const updateCart = async (req, res) => {
    const { cartId, fullCart, totalPrice } = req.body;

    try {
        await Cart.findByIdAndUpdate(cartId, { cartItems: fullCart, totalPrice: totalPrice });
        const data = new ActionResponse(`Cart updated successfuly`, 200);
        return res.status(200).json(data);
    } catch (error) {
        console.log("Error in update cart controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};