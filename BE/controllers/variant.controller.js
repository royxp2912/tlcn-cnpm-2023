import { createError } from "../utils/createError.js";
import {
    createOne,
    getVarByID,
    updateVarByID,
    deleteVarByID,
    getListVarByProID,
} from "../services/variant.service.js";

export const getAllVarByProID = async (req, res, next) => {
    try {
        const { success, status, message, data } = await getListVarByProID(req.params.proID);
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
        const { success, status, message, data } = await getVarByID(req.params.varID);
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
        const { success, status, message, data } = await deleteVarByID(req.params.varID);
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
        const { success, status, message, data } = await updateVarByID(req.params.varID, req.body.size, req.body.quantity);
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