import pkg from 'mongoose';
const { Schema, model, models } = pkg;

const OrderSchema = new Schema({
    buyer: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number },
    address: { type: String },
    stripeId: { type: String },
    phoneNumber: { type: String },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    products: { type: Array },
}, { timestamps: true });

const Order = models?.Order || model('Order', OrderSchema);

export default Order;