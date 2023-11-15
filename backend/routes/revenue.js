import express from "express";
import {
    getRevenueToday,
    getRevenueThisWeek,
    getRevenueThisMonth,
    getTotalNewUserToday,
    getTotalNewUserThisWeek,
    getDetailRevenueOfMonth,
    getDetailRevenueThisWeek,
    getTotalNewUserThisMonth,
    getDetailTotalNewUserOfMonth,
    getTopUserThisMonth,
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


export default router