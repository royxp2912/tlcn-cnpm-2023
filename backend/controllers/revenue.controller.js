import { createError } from "../utils/createError.js";
import {
    revenueToday,
    revenueThisMonth,
    revenueThisWeek,
    newUserToday,
    newUserThisWeek,
    newUserThisMonth,
    detailRevenueOfMonth,
    detailNewUserOfMonth,
    detailRevenueThisWeek,
    topUserThisMonth,
    totalOrderThisMonth,
    totalOrderThisWeek,
    totalOrderToday,
    detailTotalOrderOfMonth,
    detailTotalOrderThisWeek,
    totalProductSoldToday,
    totalProductSoldThisWeek,
    totalProductSoldThisMonth,
    detailTotalProductSoldOfMonth,
    topProductThisMonth,
} from "../services/revenue.service.js";

export const getTopProductThisMonth = async (req, res, next) => {
    try {
        const { success, status, message, data } = await topProductThisMonth();
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

export const getTopUserThisMonth = async (req, res, next) => {
    try {
        const { success, status, message, data } = await topUserThisMonth();
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

export const getDetailTotalProductSoldOfMonth = async (req, res, next) => {
    try {
        const month = req.query.month || 11;
        const year = req.query.year || 2023;
        const { success, status, message, data } = await detailTotalProductSoldOfMonth(month, year);
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

export const getDetailTotalOrderOfMonth = async (req, res, next) => {
    try {
        const month = req.query.month || 11;
        const year = req.query.year || 2023;
        const { success, status, message, data } = await detailTotalOrderOfMonth(month, year);
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

export const getDetailTotalOrderThisWeek = async (req, res, next) => {
    try {
        const { success, status, message, data } = await detailTotalOrderThisWeek();
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

export const getDetailTotalNewUserOfMonth = async (req, res, next) => {
    try {
        const month = req.query.month || 11;
        const year = req.query.year || 2023;
        const { success, status, message, data } = await detailNewUserOfMonth(month, year);
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

export const getDetailRevenueOfMonth = async (req, res, next) => {
    try {
        const month = req.query.month || 11;
        const year = req.query.year || 2023;
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

export const getDetailRevenueThisWeek = async (req, res, next) => {
    try {
        const { success, status, message, data } = await detailRevenueThisWeek();
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

export const getTotalProductSoldThisMonth = async (req, res, next) => {
    try {
        const { success, status, message, data } = await totalProductSoldThisMonth();
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

export const getTotalProductSoldThisWeek = async (req, res, next) => {
    try {
        const { success, status, message, data } = await totalProductSoldThisWeek();
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

export const getTotalProductSoldToday = async (req, res, next) => {
    try {
        const { success, status, message, data } = await totalProductSoldToday();
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

export const getTotalOrderThisMonth = async (req, res, next) => {
    try {
        const { success, status, message, data } = await totalOrderThisMonth();
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

export const getTotalOrderThisWeek = async (req, res, next) => {
    try {
        const { success, status, message, data } = await totalOrderThisWeek();
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

export const getTotalOrderToday = async (req, res, next) => {
    try {
        const { success, status, message, data } = await totalOrderToday();
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

export const getTotalNewUserThisMonth = async (req, res, next) => {
    try {
        const { success, status, message, data } = await newUserThisMonth();
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

export const getTotalNewUserThisWeek = async (req, res, next) => {
    try {
        const { success, status, message, data } = await newUserThisWeek();
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

export const getTotalNewUserToday = async (req, res, next) => {
    try {
        const { success, status, message, data } = await newUserToday();
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

export const getRevenueThisWeek = async (req, res, next) => {
    try {
        const { success, status, message, data } = await revenueThisWeek();
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