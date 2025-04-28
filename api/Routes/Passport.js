import express from 'express';
import passport from "passport";
import { verifyToken } from '../Middleware/HandleAuth.js';
import { createToken, decodeToken } from '../Utils/HandleToken.js';

const router = express.Router();

// Get
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Get
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/signin', session: false }),
    (req, res) => {
        createToken(req.user, res);
        res.redirect(`${process.env.CLIENT_URL}/oauth-success`);
    }
);

// Get
router.get('/google/success', verifyToken, (req, res) => {
    try {
        const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
        return res.status(200).json({
            user: req.user,
            token: token,
        });
    } catch (error) {
        console.error('Error during Google authentication callback:', error);
        return res.status(500).json({
            status: "fail",
            message: "Internal server error",
        });
    }
});

export default router;