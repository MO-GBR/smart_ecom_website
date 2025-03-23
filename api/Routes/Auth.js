import express from 'express';
import { register, login, forgetPassword, resetPassword, logout, checkAuth, OAuthUserRegister } from '../Controllers/Auth.js';
import { protectUserRoute } from '../Middleware/HandleAuth.js';

const router = express.Router();

// Post
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/oauth", OAuthUserRegister);

// Put
router.put("/forget", forgetPassword);
router.put("/resetpassword/:resetToken", resetPassword);

// Get
router.get("/check/:id", protectUserRoute, checkAuth);

export default router;