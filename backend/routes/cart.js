import express from "express";
import {
    addItemToCart,
    createCart,
    getCartByUserID,
    removeItemFromCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

// create
router.get("/", getCartByUserID);

// create
router.post("/", createCart);
router.post("/addToCart", addItemToCart);

// remove
router.delete("/remove", removeItemFromCart);

export default router