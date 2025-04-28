// Import Essintial Dependencies
import env from "dotenv";
import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

// Custom Imports
import { currentTime } from "./Utils/HandleResponse.js";
import { connectDB } from "./Mongo/Connection.js";
import { errorHandle } from "./Middleware/HandleAuth.js";

// Import Routes
import AuthRoutes from './Routes/Auth.js';
import UsersRoutes from './Routes/Users.js';
import CartRoutes from './Routes/Cart.js';
import ProductRoutes from './Routes/Product.js';
import OrderRoutes from './Routes/Order.js';

// ENV
env.config();

const PORT = process.env.PORT;

// Server Setup
const app = express();
const server = http.createServer(app);

// Express App Setup
const logger = (req, res, next) => {
    const currentURL = `${req.protocol}://${req.get('host')}${req.originalUrl} --at--> ${currentTime}`;
    console.log(
        'Running >>>',
        currentURL
    );
    next();
};

app.use(cookieParser());
app.use(logger);
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json({ limit: '50mb', extended: true }));

// Passport JS Setup
import './Config/Passport.js'
import passport from 'passport';
import PassportRoutes from './Routes/Passport.js';

app.use(passport.initialize());
app.use("/api/oauth", PassportRoutes);

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UsersRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/order", OrderRoutes);

// Deployment setup
const __dirname = path.resolve();

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
    });
}

// Server & Database Connection
server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
    connectDB();
});

app.use(errorHandle);