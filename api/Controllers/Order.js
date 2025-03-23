import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import env from "dotenv";
import Order from '../Mongo/Models/Order.js';
import User from "../Mongo/Models/User.js";
import Cart from "../Mongo/Models/Cart.js";
import { ActionResponse, ErrorResponse } from '../Utils/HandleResponse.js';

env.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Create order
// export const createOrder = async (req, res) => {
//     const { address, amount, phoneNumber, token } = req.body;

//     const randomKey = uuidv4();

//     try {
//         const payment = stripe.customers.create({
//             email: token.email,
//             source: token
//         }).then(async (customer) => {
//             const user = await User.findOne({email: customer.email});
//             const newOrder = await Order.create({
//                 buyer: user,
//                 amount,
//                 address,
//                 phoneNumber,
//                 products: user.cart,
//                 stripeId: customer.id
//             });

//             console.log("Order >>>", newOrder, "User >>>", user);

//             stripe.charges.create({
//                 amount: amount * 100,
//                 currency: "usd",
//                 customer: customer.id,
//                 receipt_email: token.email
//             }, { randomKey });
//         }).then((result) => {
//             const data = new ActionResponse(result, 200);
//             res.status(200).json(data);
//         });
        
//         return payment;
//     } catch (error) {
//         console.log("Error in payment controller", error.message);
//         const err = new ErrorResponse(error.message, 400);
//         return res.status(400).json(err);
//     }
// };

// Create order
export const createOrder = async (req, res) => {
    const { address, amount, phoneNumber, token, fullCart, cartId, userId } = req.body;
    console.log(fullCart);
    try {
        // 1. Create a Customer.
        const customer = await stripe.customers.create({
            metadata: {
                phoneNumber,
                address,
                cart: JSON.stringify(fullCart.toString())
            },
            email: token.email,
            source: token.id
        });

        // 2. Find the user & cart.
        const user = await User.findById(userId);
        const cart = await Cart.findById(cartId);

        // 3. Create an Order.
        const order = await Order.create({
            buyer: user,
            amount,
            address,
            phoneNumber,
            products: fullCart,
            cart,
            stripeId: customer.id
        });

        // 4. Charge the Customer instead of the card.
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