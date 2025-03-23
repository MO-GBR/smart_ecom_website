import pkg from 'mongoose';
const { Schema, model, models } = pkg;

const ProductSchema = new Schema({
    title: { type: String },
    description: { type: String },
    img: { type: String },
    price: { type: Number, required: true },
}, { timestamps: true });

const Product = models?.Product || model('Product', ProductSchema);

export default Product;