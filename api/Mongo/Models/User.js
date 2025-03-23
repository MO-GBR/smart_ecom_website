import pkg from 'mongoose';
const { Schema, model, models } = pkg;

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: {
        type: String,
        required: [true, 'please enter your right email'],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    role: {
        type: String,
        default: 'User'
    },
    authProviderId: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }
}, { timestamps: true });

const User = models?.User || model('User', UserSchema);

export default User;