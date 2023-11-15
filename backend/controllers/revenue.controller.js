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
} from "../services/revenue.service.js";

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