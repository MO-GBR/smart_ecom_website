import env from "dotenv";
import { connect } from "mongoose";

env.config();

const dbURI = process.env.MONGO_DB_URI;

export const connectDB = async () => {
    try {
        const conn = await connect(dbURI);
        console.log(`MongoDB connected successfuly 👍: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Failed 💥", "<---->", error);
    }
};