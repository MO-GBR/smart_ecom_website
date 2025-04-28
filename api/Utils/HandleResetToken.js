import { randomBytes, createHash } from 'node:crypto';
import User from '../Mongo/Models/User.js';

export const getResetPasswordToken = async (id) => {
    const resetToken = randomBytes(20).toString("hex");
    const resetPasswordToken = createHash("sha256").update(resetToken).digest("hex");
    const resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    await User.findByIdAndUpdate(
        id,
        {
            resetPasswordToken,
            resetPasswordExpire
        },
        { new: true }
    );

    return resetToken;
};

export const resetTokenValue = (resetToken) => {
    return createHash("sha256").update(resetToken).digest("hex");
};