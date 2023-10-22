import express from "express";
import {
    addItemToCart,
    createCart,
    getCartByUserID,
    removeItemFromCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

// create
router.get("/:userID", getCartByUserID);

// create
router.post("/", createCart);
router.post("/:userID/addToCart", addItemToCart);

// remove
router.delete("/:userID/remove/:proID", removeItemFromCart);

export default router