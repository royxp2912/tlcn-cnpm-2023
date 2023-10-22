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
} from "../services/comment.service.js";

export const updateCommentByID = async (req, res, next) => {
    try {
        const { success, status, message } = await update(req.params.cmtID, req.body);
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
        const { success, status, message } = await updateLike(req.params.cmtID);
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
        const { success, status, message, data } = await getAllByUserID(req.params.userID);
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
        const { success, status, message, data } = await getAllByProID(req.params.proID);
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
        const { success, status, message, data } = await getByCmtID(req.params.cmtID);
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
        const { success, status, message } = await deleteByID(req.params.cmtID);
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
        const { success, status, message, total } = await deleteAllByUserID(req.params.userID);
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