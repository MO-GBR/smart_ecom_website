import express from 'express';
import { createOrder, getAllOrders } from '../Controllers/Order.js';
import { protectUserRoute, protectAdminRoute } from '../Middleware/HandleAuth.js';

const router = express.Router();

// Post
router.post('/new', protectUserRoute, createOrder);

// Get
router.get('/', protectAdminRoute, getAllOrders);

export default router;