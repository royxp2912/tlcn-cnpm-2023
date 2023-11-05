import { createError } from "../utils/createError.js";
import {
    update,
    create,
    deleteAll,
    updateLike,
    deleteByID,
    getByCmtID,
    getAllByProID,
    getAllByUserID,
    deleteAllByUserID,
    deleteAllByProID,
} from "../services/comment.service.js";

export const updateCommentByID = async (req, res, next) => {
    try {
        const { success, status, message } = await update(req.body);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}

export const updateCommentLike = async (req, res, next) => {
    try {
        const { success, status, message } = await updateLike(req.body.comment);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}

export const getAllCommentByUserID = async (req, res, next) => {
    try {
        const pageSize = req.body.pageSize || 5;
        const pageNumber = req.body.pageNumber || 1;
        const { success, status, message, data } = await getAllByUserID(req.body.user, pageSize, pageNumber);
        if (!success) return next(createError(status, message));

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

export const getAllCommentByProID = async (req, res, next) => {
    try {
        const pageSize = req.body.pageSize || 5;
        const pageNumber = req.body.pageNumber || 1;
        const { success, status, message, data } = await getAllByProID(req.body.product, pageSize, pageNumber);
        if (!success) return next(createError(status, message));

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

export const getCommentByID = async (req, res, next) => {
    try {
        const { success, status, message, data } = await getByCmtID(req.body.comment);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
            data,
        });
    } catch (err) {
        next(err);
    }
}

export const deleteCommentByID = async (req, res, next) => {
    try {
        const { success, status, message } = await deleteByID(req.body.comment);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}

export const createComment = async (req, res, next) => {
    try {
        const { commentator, product, rating, content } = req.body;
        const { success, status, message, data } = await create(commentator, product, rating, content);
        if (!success) return next(createError(status, message));
        res.status(status).json({
            success,
            message,
            data,
        });
    } catch (err) {
        next(err);
    }
}

export const deleteAllComment = async (req, res, next) => {
    try {
        const { success, status, message, total } = await deleteAll();
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
            total,
        });
    } catch (err) {
        next(err);
    }
}

export const deleteAllCommentByUserID = async (req, res, next) => {
    try {
        const { success, status, message, total } = await deleteAllByUserID(req.body.user);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
            total,
        });
    } catch (err) {
        next(err);
    }
}

export const deleteAllCommentByProID = async (req, res, next) => {
    try {
        const { success, status, message, total } = await deleteAllByProID(req.body.product);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
            total,
        });
    } catch (err) {
        next(err);
    }
}