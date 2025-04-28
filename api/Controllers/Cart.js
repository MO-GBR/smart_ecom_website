import Cart from "../Mongo/Models/Cart.js";
import Product from '../Mongo/Models/Product.js';
import User from "../Mongo/Models/User.js";
import { ActionResponse, ErrorResponse } from "../Utils/HandleResponse.js";

const calculateTotalPrice = async (cartItems) => {
    let total = 0;
    if (!cartItems || cartItems.length === 0) return total;
    for (const item of cartItems) {
        const product = await Product.findById(item.product);

        if (product) {
            total += product.price * item.quantity;
        };
    };

    return total;
};

// Add to cart
export const addToCart = async (req, res) => {
    const { productId, quantity, color } = req.body;
    const userId = req.user._id;

    try {
        let user = await User.findById(userId).populate("cart");
        let cart = user.cart;

        if (!cart) {
            cart = await Cart.create({ cartItems: [], totalPrice: 0 });
            user.cart = cart._id;
            await user.save();
        };

        const existingItemIndex = cart.cartItems.findIndex(
            (item) => item.product.toString() === productId && item.color.code === color.code
        );

        if (existingItemIndex > -1) {
            cart.cartItems[existingItemIndex].quantity += quantity;
        } else {
            cart.cartItems.push({ product: productId, quantity, color });
        };

        const newTotalPrice = await calculateTotalPrice(cart.cartItems);

        cart.totalPrice = newTotalPrice;
        await cart.save();

        const processResponse = {
            cart: cart,
            totalPrice: newTotalPrice,
        };

        const data = new ActionResponse(processResponse, 200);
        return res.status(200).json(data);
    } catch (error) {
        console.log("Error in add to cart controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};

// Get cart
export const getCart = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).populate({
            path: "cart",
            populate: {
                path: "cartItems.product",
                model: "Product",
            },
        });
      
        if (!user.cart) {
            const emptyCart = { cartItems: [], totalPrice: 0 };
            const emptyData = new ActionResponse(emptyCart, 200);
            return res.status(200).json(emptyData);
        };

        const data = new ActionResponse(user.cart, 200);
      
        res.status(200).json(data);
    } catch (error) {
        console.log("Error in get cart controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};

// Update cart
export const updateCart = async (req, res) => {
    const { cartId } = req.params;
    const { fullCart, totalPrice } = req.body;

    try {
        const updatedCart = await Cart.findByIdAndUpdate(cartId, { cartItems: fullCart, totalPrice: totalPrice });
        const cartData = {
            cart: updatedCart,
            message: `Cart updated successfuly with id ${cartId}`,
        }
        const data = new ActionResponse(cartData, 200);
        return res.status(200).json(data);
    } catch (error) {
        console.log("Error in update cart controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};

// Remove cart item
export const removeCartItem = async (req, res) => {
    const { itemId } = req.params;
    const userId = req.user._id;
  
    try {
        const user = await User.findById(userId).populate("cart");
        const cart = user.cart;
  
        if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });
  
        cart.cartItems = cart.cartItems.filter((item) => item.product.toString() !== itemId);

        const newTotalPrice = await calculateTotalPrice(cart.cartItems);
  
        cart.totalPrice = newTotalPrice;

        await cart.save();

        const processResponse = {
            cart: cart,
            totalPrice: newTotalPrice,
        };

        const data = new ActionResponse(processResponse, 200);
  
        res.status(200).json(data);
    } catch (error) {
        console.log("Error in remove cart item controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};

// Clear entire cart
export const clearCart = async (req, res) => {
    const userId = req.user._id;
  
    try {
        const user = await User.findById(userId).populate("cart");
        const cart = user.cart;
  
        if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });
  
        cart.cartItems = [];
        cart.totalPrice = 0;
        await cart.save();

        const data = new ActionResponse("Cart cleared", 200);
  
        res.status(200).json(data);
    } catch (error) {
      console.log("Error in clear cart controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};