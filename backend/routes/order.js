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
import createPaymentUrl from "../utils/createPaymentUrl.js";

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

// create vnpay url
router.post('/create_payment_url', function (req, res, next) {
    const vnpUrl = createPaymentUrl(req);

    res.status(200).json({ vnpUrl });
});

export default router