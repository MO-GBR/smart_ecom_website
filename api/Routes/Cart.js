import express from 'express';
import { 
    addToCart,
    getCart,
    removeCartItem,
    clearCart,
    updateCart
} from '../Controllers/Cart.js';

import { protectUserRoute } from '../Middleware/HandleAuth.js';

const router = express.Router();

// Post
router.post("/add", protectUserRoute, addToCart);

// Get
router.get("/", protectUserRoute, getCart);

// Put
router.put("/update/:cartId", protectUserRoute, updateCart);

// Delete
router.delete("/remove/:itemId", protectUserRoute, removeCartItem);
router.delete("/clear", protectUserRoute, clearCart);

export default router;