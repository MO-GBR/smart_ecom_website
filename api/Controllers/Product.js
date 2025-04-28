import cloudinary from '../Utils/HandleUpload.js';
import Product from '../Mongo/Models/Product.js';
import { ActionResponse, ErrorResponse } from '../Utils/HandleResponse.js';

// create product
export const createProduct = async (req, res) => {
    const { title, description, img, price } = req.body;

    try {
        if(!title || !description || !img || !price) {
            const err = new ActionResponse("All fields are required");
            res.status(400).json(err);
        }

        const productImg = await cloudinary.uploader.upload(img);

        const newProduct = await Product.create({
            title,
            description,
            img: productImg.secure_url,
            price 
        });

        const data = new ActionResponse(newProduct, 200);
        return res.status(200).json(data);
    } catch (error) {
        console.log("Error in create product controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};

// get all products
export const getAllProducts = async (req, res) => {
    try {
        const allProducts =  await Product.find();
        const data = new ActionResponse(allProducts, 200);
        res.status(200).json(data);
    } catch (error) {
        console.log("Error in get all products controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};

// get one product by id
export const getProduct = async (req, res) => {
    const id = req.params.id

    try {
        const product = await Product.findById(id);
        if(!product) return res.status(404).json({message: "Product not found"});
        const data = new ActionResponse(product, 200);
        res.status(200).json(data);
    } catch (error) {
        console.log("Error in get one product controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};

// Update one by id
export const updateProduct = async (req, res) => {
    const updates = req.body;
    const id = req.params.id;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, {new: true});
        const data = new ActionResponse(updatedProduct, 200);
        res.status(200).json(data);
    } catch (error) {
        console.log("Error in update one product controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};

// Delete by id
export const deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        await Product.findByIdAndDelete(id);
        const data = new ActionResponse(`Product with id ${id} deleted successfuly`, 200);
        res.status(200).json(data);
    } catch (error) {
        console.log("Error in delete one product controller", error.message);
        const err = new ErrorResponse(error.message, 400);
        return res.status(400).json(err);
    }
};