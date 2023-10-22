import express from "express";
import {
    createOrder,
    getAllOrder,
    getOrderByID,
    cancelOrderByID,
    updateOrderStatus,
    getAllOrderByUserID,
    paymentConfirmOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

// get 
router.get("/", getAllOrder);
router.get("/:orderID", getOrderByID);
router.get("/user/:userID", getAllOrderByUserID);

// create
router.post("/", createOrder);

// patch
router.patch("/:orderID", updateOrderStatus);
router.patch("/:orderID/cancel", cancelOrderByID);
router.patch("/:orderID/paid", paymentConfirmOrder);

export default router