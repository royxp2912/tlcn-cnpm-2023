import express from "express";
import {
    addItemToCart,
    addItemToCartWithoutVariant,
    createCart,
    getCartByUserID,
    removeItemFromCart,
    updateVariantProInCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

// create
router.get("/", getCartByUserID);

// create
router.post("/", createCart);
router.post("/addToCart", addItemToCart);
router.post("/addToCart/randomVar", addItemToCartWithoutVariant);
router.patch("/update/quantity", updateVariantProInCart);

// remove
router.delete("/remove", removeItemFromCart);

export default router