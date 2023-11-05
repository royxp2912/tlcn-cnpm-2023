import { createError } from "../utils/createError.js";
import {
    create,
    getAll,
    getByID,
    cancelOrder,
    updateStatus,
    getAllByUserID,
    getAllByStatus,
    paymentConfirm,
    deliveryConfirm,
    findByKeyword,
} from "../services/order.service.js";


export const searchOrderByKeyword = async (req, res, next) => {
    try {
        const keyword = req.body.keyword || "";
        const pageSize = req.body.pageSize || 5;
        const pageNumber = req.body.pageNumber || 1;

        const { success, status, message, data } = await findByKeyword(keyword, pageSize, pageNumber);
        if (!success) return next(createError(status, message));

        if (data.length === 0) {
            res.status(404).json({
                success: success,
                message: `No Order found matching keyword <${keyword}> !!!`,
            });
        }

        res.status(status).json({
            success,
            message,
            total: data.length,
            data,
        });
    } catch (err) {
        next(err);
    }
}

export const deliveryConfirmOrder = async (req, res, next) => {
    try {
        const { success, status, message } = await deliveryConfirm(req.body.order);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}

export const paymentConfirmOrder = async (req, res, next) => {
    try {
        const { success, status, message } = await paymentConfirm(req.body.order);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}

export const cancelOrderByID = async (req, res, next) => {
    try {
        const { success, status, message } = await cancelOrder(req.body.order);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}

export const updateOrderStatus = async (req, res, next) => {
    try {
        const { success, status, message } = await updateStatus(req.body.order, req.body.status);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}

export const getOrderByID = async (req, res, next) => {
    try {
        const { success, status, message, data } = await getByID(req.body.order);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            data,
        });
    } catch (err) {
        next(err);
    }
}

export const getAllOrderByUserID = async (req, res, next) => {
    try {
        const pageSize = req.body.pageSize || 5;
        const pageNumber = req.body.pageNumber || 1;
        const { success, status, message, data } = await getAllByUserID(req.body.user, pageSize, pageNumber);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            total: data.length,
            data,
        });
    } catch (err) {
        next(err);
    }
}

export const getAllOrder = async (req, res, next) => {
    try {
        const orderStatus = req.body.status;
        const pageSize = req.body.pageSize || 5;
        const pageNumber = req.body.pageNumber || 1;
        if (orderStatus) {
            const { success, status, message, data } = await getAllByStatus(orderStatus, pageSize, pageNumber);
            if (!success) return next(createError(status, message));
            res.status(status).send({
                success,
                message,
                total: data.length,
                data,
            });
        }

        const { success, status, message, data } = await getAll(pageSize, pageNumber);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            total: data.length,
            data,
        });
    } catch (err) {
        next(err);
    }
}

export const createOrder = async (req, res, next) => {
    try {
        const { success, status, message } = await create(req.body);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}