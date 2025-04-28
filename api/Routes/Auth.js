import express from 'express';
import { register, login, forgetPassword, resetPassword, logout, checkAuth } from '../Controllers/Auth.js';
import { protectUserRoute } from '../Middleware/HandleAuth.js';

const router = express.Router();

// Post
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Put
router.put("/forget", forgetPassword);
router.put("/resetpassword/:resetToken", resetPassword);

// Get
router.get("/check/:id", protectUserRoute, checkAuth);

export default router;