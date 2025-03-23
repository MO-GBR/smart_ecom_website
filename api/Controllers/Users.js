import Cart from "../Mongo/Models/Cart.js";
import User from "../Mongo/Models/User.js";
import { ActionResponse, ErrorResponse } from "../Utils/HandleResponse.js";

// get all users
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        const data = new ActionResponse(allUsers, 200);
        return res.status(200).json(data);
    } catch (error) {
        console.log("Error in get all users controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};

// delete user by id
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        const cart = user.cart;
        
        await Cart.findByIdAndDelete(cart._id);
        await User.findByIdAndDelete(id);
        const data = new ActionResponse(`User with id ${id} deleted successfuly`, 200);
        return res.status(200).json(data);
    } catch (error) {
        console.log("Error in delete user controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};

// Get one user
export const getOneUser = async (req, res) => {
    const id = req.body.id;
    try {
        const user = await User.findById(id);
        const data = new ActionResponse(user, 200);
        return res.status(200).json(data);
    } catch (error) {
        console.log("Error in get one user controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};