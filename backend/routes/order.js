import express from 'express';
import {
    createOrder,
    getAllOrder,
    getOrderByID,
    cancelOrderByID,
    returnOrderByID,
    updateOrderStatus,
    receivedOrderByID,
    getAllOrderByUserID,
    paymentConfirmOrder,
    deliveryConfirmOrder,
    searchOrderByKeyword,
    getAllOrderByStatusAndUserID,
} from "../controllers/order.controller.js";
import createPaymentUrl from "../utils/createPaymentUrl.js";

const router = express.Router();

// get 
router.get("/", getAllOrder);
router.get("/detail", getOrderByID);
router.get("/user", getAllOrderByUserID);
router.get("/user/status", getAllOrderByStatusAndUserID);

// search by keyword
router.get('/search/keyword', searchOrderByKeyword);

// create
router.post('/', createOrder);

// patch
router.patch('/', updateOrderStatus);
router.patch('/cancel', cancelOrderByID);
router.patch('/return', returnOrderByID);
router.patch('/paid', paymentConfirmOrder);
router.patch('/received', receivedOrderByID);
router.patch('/delivered', deliveryConfirmOrder);

// create vnpay url
router.post('/create_payment_url', function (req, res, next) {
    const vnpUrl = createPaymentUrl(req);

    res.status(200).json({ vnpUrl });
});

export default router;
