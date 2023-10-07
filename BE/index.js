import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import cartRoute from "./routes/cart.js";
import usersRoute from "./routes/users.js";
import orderRoute from "./routes/order.js";
import addressRoute from "./routes/address.js";
import productsRoute from "./routes/products.js";
import commentsRoute from "./routes/comments.js";
import categoryRoute from "./routes/category.js";
import variantsRoute from "./routes/variants.js";
// import client from "./connections/redis.js";

// connect to mongodb
import mongoDB from "./connections/mongodb.js";

const app = express();
dotenv.config();

// middleware
app.use(cookieParser());
app.use(express.json());

// Route API
app.use("/cart", cartRoute);
app.use("/auth", authRoute);
app.use("/order", orderRoute);
app.use("/users", usersRoute);
app.use("/address", addressRoute);
app.use("/products", productsRoute);
app.use("/comments", commentsRoute);
app.use("/category", categoryRoute);
app.use("/variants", variantsRoute);

// middleware handel error
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!!!";

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(process.env.PORT_BE, () => {
    mongoDB();
    console.log("Connect to backend done!");
});