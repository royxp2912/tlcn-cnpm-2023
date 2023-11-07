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
} from "../services/variant.service.js";

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