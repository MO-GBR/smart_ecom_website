import Stripe from 'stripe';
import env from "dotenv";
import Order from '../Mongo/Models/Order.js';
import User from "../Mongo/Models/User.js";
import Cart from "../Mongo/Models/Cart.js";
import { ActionResponse, ErrorResponse } from '../Utils/HandleResponse.js';

env.config();
// Create order
export const createOrder = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { address, amount, phoneNumber, token } = req.body;

    const userId = req.user._id;
    
    try {
        // 1. Find the user & cart.
        const user = await User.findById(userId).populate({
            path: "cart",
            populate: {
                path: "cartItems.product",
                model: "Product",
            },
        });

        const cart = user.cart;

        // 2. Create a new version of cart.
        const fullCart = cart?.cartItems.map((item) => {
            return {
                productId: item.product._id,
                quantity: item.quantity,
                color: item.color
            };
        }) || [];

        // 3. Create a Customer.
        const customer = await stripe.customers.create({
            metadata: {
                phoneNumber,
                address,
                cart: JSON.stringify(fullCart.toString())
            },
            email: token.email,
            source: token.id
        });

        // 4. Create an Order.
        const order = await Order.create({
            buyer: user,
            amount,
            address,
            phoneNumber,
            products: fullCart,
            cart,
            stripeId: customer.id
        });

        // 5. Charge the Customer instead of the card.
        const payment = await stripe.charges.create({
            amount: amount * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            source: customer.default_source
        });

        if(!payment) {
            const err = new ActionResponse("Payment failed", 400);
            return res.status(400).json(err);
        }

        const response = { customer, order, payment };
        const data = new ActionResponse(response, 200);
        return res.status(200).json(data);
    } catch (error) {
        console.log("Error in payment controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const allOrders =  await Order.find();
        const data = new ActionResponse(allOrders, 200);
        return res.status(200).json(data);
    } catch (error) {
        console.log("Error in get all products controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};