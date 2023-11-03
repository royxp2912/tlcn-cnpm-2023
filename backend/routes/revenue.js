import express from "express";
import {
    getRevenueToday,
    getRevenueThisMonth,
    getDetailRevenueOfMonth,
} from "../controllers/revenue.controller.js";

const router = express.Router();

// GET ALL
router.get("/today", getRevenueToday);
router.get("/thisMonth", getRevenueThisMonth);
router.get("/detailOfMonth", getDetailRevenueOfMonth);

export default router