import Cart from "../Mongo/Models/Cart.js";
import User from "../Mongo/Models/User.js";
import { SendEmail } from "../Utils/HandleEmail.js";
import { getResetPasswordToken, resetTokenValue } from "../Utils/HandleResetToken.js";
import { ErrorResponse, ActionResponse } from "../Utils/HandleResponse.js";
import { createToken } from "../Utils/HandleToken.js";
import bcrypt from "bcryptjs";

// Register
export const register = async (req, res) => {
    const { firstName, lastName, password, confirmPassword, email } = req.body;

    try {
        if(!firstName || !lastName || !password || !confirmPassword || !email) {
            const err = new ActionResponse("All fields are required", 400);
            return res.status(400).json(err);
        }

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            const err = new ActionResponse("User exists already.", 400);
            return res.status(400).json(err);
        }

        if (password !== confirmPassword) {
            const err = new ActionResponse("Your passwords don't match", 400);
            return res.status(400).json(err);
        };

        if (password.length < 6) {
            const err = new ActionResponse("Password is too short", 400);
            return res.status(400).json(err);
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const emptyCart = await Cart.create({
            cartItems: [],
            totalPrice: 0
        });

        const newUser = await User.create({
            firstName,
            lastName,
            password: hashedPassword,
            email,
            cart: emptyCart
        });

        if(newUser) {
            createToken(newUser, res);
        } else {
            const err = new ActionResponse("Password is too short", 400);
            return res.status(400).json(err);
        };

        const data = new ActionResponse(newUser, 200);

        return res.status(200).json(data);
    } catch (error) {
        console.log("Error in register controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) {
            const err = new ActionResponse("Both email & password are required", 400);
            return res.status(400).json(err);
        }

        const user = await User.findOne({ email });

        if(!user) {
            const err = new ActionResponse("Invalid email", 400);
            return res.status(400).json(err);
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            const err = new ActionResponse("Invalid password", 400);
            return res.status(400).json(err);
        }

        const UserData = {
            id: user._id,
            fullName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
            cart: user.cart
        };

        createToken(UserData, res);

        const data = new ActionResponse(UserData, 200);

        return res.status(200).json(data);
    } catch (error) {
        console.log("Error in login controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};

// Forget Password
export const forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if(!user) {
            const err = new ActionResponse("Please write your correct email", 400);
            return res.status(400).json(err);
        }

        const ApplyResetPasswordToken = await getResetPasswordToken(user._id);

        const resetURL = `${process.env.BASE_URL}/resetpassword/${ApplyResetPasswordToken}`;

        const message = `
           <h1>You have requested a password reset</h1>
           <p>Please use this link to reset your password</p>
           <a href = ${resetURL} clicktracking = off>CLICK HERE</a>
        `;

        try {
            SendEmail({
                to: user.email,
                subject: "Password reset request",
                text: message
            });
        } catch (error) {
            const err = new ErrorResponse(error.message, 400);
            return res.status(400).json(err);
        }

        const ResponseData = { success: true, data: "Email sent" };

        const data = new ActionResponse(ResponseData, 200);

        res.status(200).json(data);
    } catch (error) {
        console.log("Error in forget password controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    const resetToken = req.params.resetToken;
    const {password, confirmPassword} = req.body;

    try {
        const token = resetTokenValue(resetToken);

        const user = await User.findOne({ resetPasswordToken: token });

        if(!user) {
            const err = new ActionResponse("Invalid Reset Token", 400);
            return res.status(400).json(err);
        };

        if (password !== confirmPassword) {
            const err = new ActionResponse("Your passwords don't match", 400);
            return res.status(400).json(err);
        }

        if (password.length < 6) {
            const err = new ActionResponse("Your password is too short", 400);
            return res.status(400).json(err);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            await User.findByIdAndUpdate(
                user._id,
                {
                    password: hashedPassword,
                    resetPasswordToken: null,
                    resetPasswordExpire: null
                },
                { new: true }
            );
        } catch (error) {
            const err = new ErrorResponse(error.message, 400);
            return res.status(400).json(err);
        }

        const data = new ActionResponse("Reset password successfuly", 200);
        return res.status(200).json(data);
    } catch (error) {
        console.log("Error in reset password controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};

// Google Auth
export const OAuthUserRegister = async (req, res) => {
    const { firstName, email, authProviderId } = req.body;

    try {
        const user = await User.findOne({ email });
        if(user) {
            const data = new ActionResponse(user, 200);
            res.status(200).json(data);
        } else {
            const emptyCart = await Cart.create({
                cartItems: [],
                totalPrice: 0
            });
            const newUser = await User.create({
                firstName,
                email,
                authProviderId,
                cart: emptyCart
            });
            const data = new ActionResponse(newUser, 200);
            res.status(200).json(data);
        }
    } catch (error) {
        console.log("Error in OAuth controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
}

// Check user auth
export const checkAuth = (req, res) => {
    try {
        const data = new ActionResponse(req.user.data, 200);
        res.status(200).json(data);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};

// Log out
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        const data = new ActionResponse({ message: "Logged out successfully" }, 200);
        res.status(200).json(data);
    } catch (error) {
        console.log("Error in logout controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};