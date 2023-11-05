import { createError } from "../utils/createError.js";
import {
    createOne,
    getVarByID,
    updateVarByID,
    deleteVarByID,
    getListVarByProID,
    getSizeByColorAndProID,
    getColorBySizeAndProID,
} from "../services/variant.service.js";

export const getColorOfProductBySizeAndProID = async (req, res, next) => {
    try {
        const { success, status, message, data } = await getColorBySizeAndProID(req.body.product, req.body.size);
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
        const { success, status, message, data } = await getSizeByColorAndProID(req.body.product, req.body.color);
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
        const { success, status, message, data } = await getListVarByProID(req.body.product);
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
        const { success, status, message, data } = await getVarByID(req.body.variant);
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
        const { success, status, message, data } = await deleteVarByID(req.body.variant);
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
        const { success, status, message, data } = await updateVarByID(req.body.variant, req.body.size, req.body.quantity);
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