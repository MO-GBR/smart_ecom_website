import express from 'express';
import { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct } from '../Controllers/Product.js';
import { protectAdminRoute } from '../Middleware/HandleAuth.js';

const router = express.Router();

// Post
router.post('/new', protectAdminRoute, createProduct);

// Put
router.put('/update/:id', protectAdminRoute, updateProduct);

// Get
router.get('/', getAllProducts);
router.get('/:id', getProduct);

// Delete
router.delete('/:id', protectAdminRoute, deleteProduct);

export default router;