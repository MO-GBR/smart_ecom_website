import pkg from 'mongoose';
const { Schema, model, models } = pkg;

const CartSchema = new Schema({
    cartItems: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
            },
            color: {
                bg: { type: String },
                code: { type: String }
            },
        }
    ],
    totalPrice: { type: Number }
}, { timestamps: true });

const Cart = models?.Cart || model('Cart', CartSchema);

export default Cart;