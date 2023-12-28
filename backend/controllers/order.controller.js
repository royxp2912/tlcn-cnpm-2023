import { createError } from "../utils/createError.js";
import {
    create,
    getAll,
    getByID,
    returnOrder,
    cancelOrder,
    updateStatus,
    findByKeyword,
    receivedOrder,
    getAllByUserID,
    getAllByStatus,
    paymentConfirm,
    deliveryConfirm,
    getAllByStatusAndUser,
} from "../services/order.service.js";

export const receivedOrderByID = async (req, res, next) => {
    try {
        const { success, status, message } = await receivedOrder(req.body.order);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}

export const returnOrderByID = async (req, res, next) => {
    try {
        const { success, status, message } = await returnOrder(req.body.order);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}

export const getAllOrderByStatusAndUserID = async (req, res, next) => {
    try {
        const userID = req.query.user;
        const statusOrder = req.query.status;
        const pageSize = req.query.pageSize || 5;
        const pageNumber = req.query.pageNumber || 1;
        const { success, status, pages, message, data } = await getAllByStatusAndUser(userID, statusOrder, pageSize, pageNumber);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            pages,
            total: data.length,
            data,
        });
    } catch (err) {
        next(err);
    }
}

export const searchOrderByKeyword = async (req, res, next) => {
    try {
        const keyword = req.query.keyword || "";
        const pageSize = req.query.pageSize || 5;
        const pageNumber = req.query.pageNumber || 1;

        const { success, status, pages, message, data } = await findByKeyword(keyword, pageSize, pageNumber);
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
            pages,
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
        const { success, status, message, data } = await getByID(req.query.order);
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
        const pageSize = req.query.pageSize || 5;
        const pageNumber = req.query.pageNumber || 1;
        const { success, status, pages, message, data } = await getAllByUserID(req.query.user, pageSize, pageNumber);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            pages,
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
        const pageSize = req.query.pageSize || 5;
        const pageNumber = req.query.pageNumber || 1;
        if (orderStatus) {
            const { success, status, pages, message, data } = await getAllByStatus(orderStatus, pageSize, pageNumber);
            if (!success) return next(createError(status, message));
            res.status(status).send({
                success,
                message,
                pages,
                total: data.length,
                data,
            });
        }

        const { success, status, pages, message, data } = await getAll(pageSize, pageNumber);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            pages,
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