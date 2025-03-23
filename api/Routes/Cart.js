import express from 'express';
import { updateCart } from '../Controllers/Cart.js';
import { protectUserRoute } from '../Middleware/HandleAuth.js';

const router = express.Router();

// Put
router.put('/update', protectUserRoute, updateCart);

export default router;