import env from "dotenv"

import jwt from 'jsonwebtoken';
import { ErrorResponse } from "./HandleResponse.js";

env.config();

export const AGE_NUM = Math.floor(Date.now() / 1000) + (60 * 2);
const JWT_AGE = `${AGE_NUM}d`;
const secret = process.env.JWT_SEC;

export const createToken = (data, res) => {
    const token = jwt.sign({ data }, secret, { expiresIn: JWT_AGE });

    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: false, 
        secure: process.env.NODE_ENV !== "development",
    });
};

export const decodeToken = (req) => {
    const token = req.cookies.jwt;

    if(!token) return new ErrorResponse("You are not authenticated!", 401);
    const decodedToken = jwt.verify(token, secret, (error, payload) => {
        if(error) return new ErrorResponse("Token is not valid", 403);
        return payload;
    });
    return decodedToken;
};