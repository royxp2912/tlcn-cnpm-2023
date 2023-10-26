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
} from "../services/order.service.js";


export const paymentConfirmOrder = async (req, res, next) => {
    try {
        const { success, status, message } = await paymentConfirm(req.params.orderID);
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
        const { success, status, message } = await cancelOrder(req.params.orderID);
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
        const { success, status, message } = await updateStatus(req.params.orderID, req.body.status);
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
        const { success, status, message, data } = await getByID(req.params.orderID);
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
        const { success, status, message, data } = await getAllByUserID(req.params.userID);
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
        const orderStatus = req.query.status;
        if (orderStatus) {
            const { success, status, message, data } = await getAllByStatus(orderStatus);
            if (!success) return next(createError(status, message));
            res.status(status).send({
                success,
                message,
                total: data.length,
                data,
            });
        }

        const { success, status, message, data } = await getAll();
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