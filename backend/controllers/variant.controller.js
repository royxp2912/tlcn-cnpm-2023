import { createError } from "../utils/createError.js";
import {
    createOne,
    getVarByID,
    deleteVarByID,
    updateVarByID,
    getOneByProID,
    getListVarByProID,
    getSizeByColorAndProID,
    getColorBySizeAndProID,
    getDetailListVarByProID,
    getVarByColorAndSize,
} from "../services/variant.service.js";

export const getVariantByColorAndSize = async (req, res, next) => {
    try {
        const product = req.query.product;
        const color = req.query.color;
        const size = req.query.size;
        const { success, status, message, data } = await getVarByColorAndSize(product, color, size);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            data
        });
    } catch (err) {
        next(err);
    }
}

export const getAllDetailVarByProID = async (req, res, next) => {
    try {
        const { success, status, message, data } = await getDetailListVarByProID(req.query.product);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            total: data.length,
            data
        });
    } catch (err) {
        next(err);
    }
}

export const getOneVarByProID = async (req, res, next) => {
    try {
        const { success, status, message, data } = await getOneByProID(req.query.product);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            total: data.length,
            data
        });
    } catch (err) {
        next(err);
    }
}

export const getColorOfProductBySizeAndProID = async (req, res, next) => {
    try {
        const { success, status, message, data } = await getColorBySizeAndProID(req.query.product, req.query.size);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            total: data.length,
            data
        });
    } catch (err) {
        next(err);
    }
}

export const getSizeOfProductByColorAndProID = async (req, res, next) => {
    try {
        const { success, status, message, data } = await getSizeByColorAndProID(req.query.product, req.query.color);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            total: data.length,
            data
        });
    } catch (err) {
        next(err);
    }
}

export const getAllVarByProID = async (req, res, next) => {
    try {
        const { success, status, message, data } = await getListVarByProID(req.query.product);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            total: data.length,
            data
        });
    } catch (err) {
        next(err);
    }
}

export const getVariantByID = async (req, res, next) => {
    try {
        const { success, status, message, data } = await getVarByID(req.query.variant);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            data
        });
    } catch (err) {
        next(err);
    }
}

export const deleteVariantByID = async (req, res, next) => {
    try {
        const { success, status, message, data } = await deleteVarByID(req.query.variant);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}

export const updateVariantByID = async (req, res, next) => {
    try {
        const variant = req.body.variant;
        const color = req.body.color;
        const size = req.body.size;
        const quantity = req.body.quantity;
        const { success, status, message, data } = await updateVarByID(variant, color, size, quantity);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}

export const createOneVariant = async (req, res, next) => {
    try {
        const { success, status, message, data } = await createOne(req.body.proID, req.body.variant);
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