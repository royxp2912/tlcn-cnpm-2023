import express from "express";
import {
    getRevenueToday,
    getRevenueThisWeek,
    getTotalOrderToday,
    getRevenueThisMonth,
    getTopUserThisMonth,
    getTotalNewUserToday,
    getTotalOrderThisWeek,
    getTotalOrderThisMonth,
    getTopProductThisMonth,
    getTotalNewUserThisWeek,
    getDetailRevenueOfMonth,
    getDetailRevenueThisWeek,
    getTotalNewUserThisMonth,
    getTotalProductSoldToday,
    getDetailTotalOrderOfMonth,
    getDetailTotalOrderThisWeek,
    getTotalProductSoldThisWeek,
    getDetailTotalNewUserOfMonth,
    getTotalProductSoldThisMonth,
    getDetailTotalProductSoldOfMonth,
} from "../controllers/revenue.controller.js";

const router = express.Router();

// Revenue
router.get("/today", getRevenueToday);
router.get("/thisWeek", getRevenueThisWeek);
router.get("/thisMonth", getRevenueThisMonth);

router.get("/detailThisWeek", getDetailRevenueThisWeek);
router.get("/detailOfMonth", getDetailRevenueOfMonth);

// Total User
router.get("/users/today", getTotalNewUserToday);
router.get("/users/thisWeek", getTotalNewUserThisWeek);
router.get("/users/thisMonth", getTotalNewUserThisMonth);

router.get("/users/detailOfMonth", getDetailTotalNewUserOfMonth);
router.get("/users/topThisMonth", getTopUserThisMonth);

// Total Order
router.get("/orders/today", getTotalOrderToday);
router.get("/orders/thisWeek", getTotalOrderThisWeek);
router.get("/orders/thisMonth", getTotalOrderThisMonth);

router.get("/orders/detailThisWeek", getDetailTotalOrderThisWeek);
router.get("/orders/detailOfMonth", getDetailTotalOrderOfMonth);

// Total Product
router.get("/products/today", getTotalProductSoldToday);
router.get("/products/thisWeek", getTotalProductSoldThisWeek);
router.get("/products/thisMonth", getTotalProductSoldThisMonth);

router.get("/products/topThisMonth", getTopProductThisMonth);
router.get("/products/detailOfMonth", getDetailTotalProductSoldOfMonth);

export default router