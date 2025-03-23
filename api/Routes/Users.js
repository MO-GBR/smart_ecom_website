import express from 'express';
import { getAllUsers, getOneUser, deleteUser } from '../Controllers/Users.js';
import { protectAdminRoute } from '../Middleware/HandleAuth.js';

const router = express.Router();

// Get
router.get('/', protectAdminRoute, getAllUsers);
router.get('/:id', getOneUser);

// Delete
router.delete('/:id', protectAdminRoute, deleteUser);

export default router;