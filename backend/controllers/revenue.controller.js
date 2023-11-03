import { createError } from "../utils/createError.js";
import {
    revenueToday,
    revenueThisMonth,
    detailRevenueOfMonth,
} from "../services/revenue.service.js";

export const getDetailRevenueOfMonth = async (req, res, next) => {
    try {
        const month = req.body.month || 11;
        const year = req.body.year || 2023;
        const { success, status, message, data } = await detailRevenueOfMonth(month, year);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
            data,
        })
    } catch (err) {
        next(err)
    }
}

export const getRevenueThisMonth = async (req, res, next) => {
    try {
        const { success, status, message, data } = await revenueThisMonth();
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
            data,
        })
    } catch (err) {
        next(err)
    }
}

export const getRevenueToday = async (req, res, next) => {
    try {
        const { success, status, message, data } = await revenueToday();
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
            data,
        })
    } catch (err) {
        next(err)
    }
}