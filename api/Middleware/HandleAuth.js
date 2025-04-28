import { ErrorResponse } from '../Utils/HandleResponse.js';
import { decodeToken } from '../Utils/HandleToken.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

    try {
        const decodedToken = decodeToken(token);
        if(!decodedToken) return res.status(400).json("You are not authenticated!");
        req.user = decodedToken;
    } catch (error) {
        console.error("Invalid token:", error.message);
        return res.status(403).json("Token is not valid");
    }
    next();
};

export const protectUserRoute = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user) {
            next();
        } else {
            res.status(400).json("You are not authenticated!")
        }
    })
};

export const protectAdminRoute = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "Admin") {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!")
        }
    })
};

export const errorHandle = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    console.log(err);

    //! duplicate email error
    if (err.code === 11000) {
        const message = 'that username is already registered';
        error = new ErrorResponse(message, 400);
    }

    //! validation errors
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'server Error'
    });
};