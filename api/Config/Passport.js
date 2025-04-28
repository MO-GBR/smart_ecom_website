import env from "dotenv"

env.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../Mongo/Models/User.js";
import Cart from "../Mongo/Models/Cart.js";
import { ErrorResponse } from "../Utils/HandleResponse.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ authProviderId: profile.id });

            if (existingUser) {
                return done(null, existingUser);
            };

            const emptyCart = await Cart.create({
                cartItems: [],
                totalPrice: 0
            });

            const newUser = await User.create({
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                authProviderId: profile.id,
                password: null, // No password for Google users
                cart: emptyCart,
            });

            if (!newUser) {
                const err = new ErrorResponse("Failed to create user", 400);
                return done(err, null);
            }

            return done(null, newUser);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
    try {
        const user = await User.findById(_id).select("-password -__v");
        if (!user) {
            return done(new ErrorResponse("User not found", 404), null);
        }
        done(null, user);
    } catch (error) {
        const err = new ErrorResponse(`Error in Passport JS: ${error.message}`, 500);
        console.error(err);
    }
});