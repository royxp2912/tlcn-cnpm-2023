import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.js';
import cartRoute from './routes/cart.js';
import usersRoute from './routes/users.js';
import orderRoute from './routes/order.js';
import addressRoute from './routes/address.js';
import revenueRoute from './routes/revenue.js';
import productsRoute from './routes/products.js';
import commentsRoute from './routes/comments.js';
import variantsRoute from './routes/variants.js';
import categoryRoute from './routes/categories.js';
// import client from "./connections/redis.js";

// connect to mongodb
import mongoDB from './connections/mongodb.js';

const app = express();
dotenv.config();

app.use(
    cors({
        credentials: true,
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }),
);

app.options('*', cors({ credentials: true, origin: true }));

// middleware
app.use(cookieParser());
app.use(express.json());

// Route API
app.use('/auth', authRoute);
app.use('/carts', cartRoute);
app.use('/users', usersRoute);
app.use('/orders', orderRoute);
app.use('/address', addressRoute);
app.use('/revenue', revenueRoute);
app.use('/products', productsRoute);
app.use('/comments', commentsRoute);
app.use('/variants', variantsRoute);
app.use('/categories', categoryRoute);

// middleware handel error
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong!!!';

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(process.env.PORT_BE, () => {
    mongoDB();
    console.log('Connect to backend done!');
});
